import supabase from "./supabase";

export async function loginApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data } = await supabase.auth.getUser();
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function createUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { fullName: fullName }, avatar: "" },
  });

  if (error) throw new Error(error.message);

  return { data };
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // update fullName and password
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error?.message);
  if (!avatar) return data;

  //update avatar photo

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError?.message);

  // update avatar in the user
  const { data: updateAvatar, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://atkekervqrtyhulonkwq.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarError) throw new Error(avatarError?.message);
  return updateAvatar;
}
