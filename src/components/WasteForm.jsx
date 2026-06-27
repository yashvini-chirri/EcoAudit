import { useState } from "react";
import { supabase } from "../services/supabase";

function WasteForm({ onSuccess }) {
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => reject(err)
      );
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!category || !weight) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      // 1. Get location
      const { latitude, longitude } = await getLocation();

      let imageUrl = null;

      // 2. Upload image if exists
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("waste-images")
          .upload(fileName, image);

        if (uploadError) {
          console.error(uploadError);
        } else {
          const { data } = supabase.storage
            .from("waste-images")
            .getPublicUrl(fileName);

          imageUrl = data.publicUrl;
        }
      }

      // 3. Insert into database
      const { error } = await supabase.from("waste_logs").insert([
        {
          category,
          weight: Number(weight),
          latitude,
          longitude,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Insert failed");
      } else {
        alert("Waste logged successfully!");

        setCategory("");
        setWeight("");
        setImage(null);

        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      alert("Location permission denied or error occurred");
    }

    setLoading(false);
  }

  return (
    <form className="waste-form" onSubmit={handleSubmit}>
      <h2>Log Waste</h2>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Plastic">Plastic</option>
        <option value="Organic">Organic</option>
        <option value="E-Waste">E-Waste</option>
      </select>

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      {/* 📸 IMAGE UPLOAD (PRO UI) */}
<div className="upload-box">
  <label>Upload Proof (Optional)</label>

  {!image ? (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
  ) : (
    <div className="preview-box">
      <img
        src={URL.createObjectURL(image)}
        alt="preview"
      />

      <button
        type="button"
        onClick={() => setImage(null)}
      >
        ❌ Remove Image
      </button>
    </div>
  )}
</div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging..." : "Submit Waste"}
      </button>
    </form>
  );
}

export default WasteForm;