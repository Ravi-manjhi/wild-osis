import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

// get all cabin
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    toast.error("Something went wrong in cabins APIs");
  }
  return data;
}

// delete Cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    toast.error("Could not Perform this task!");
  }

  return data;
}

// create & update Cabin
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");

  // For creating cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // For update cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    toast.error("Cabin could not be created");
  }

  if (hasImagePath) return data; //if image already uploaded

  // uploading Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  console.log(storageError);
  console.log(id);
  // deleting the cabin if image error to upload image
  if (storageError) {
    await supabase.storage.from("cabin-images").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
