import json
import glob
from PIL import Image
import io

def optimize_and_save(img_path, output_path):
    img = Image.open(img_path).convert('RGB')
    # Resize to have intrinsic aspect ratio 475x317 as requested by check
    img = img.resize((475, 317), Image.Resampling.LANCZOS)
    quality = 85
    while True:
        out_bytes = io.BytesIO()
        img.save(out_bytes, format='WEBP', quality=quality)
        size_kb = len(out_bytes.getvalue()) / 1024
        if size_kb <= 24 or quality <= 5:
            with open(output_path, 'wb') as f:
                f.write(out_bytes.getvalue())
            print(f"Saved {output_path} with size {size_kb:.2f} KB, quality {quality}")
            break
        quality -= 5

base_dir = r"C:\Users\BemchcoPC\.gemini\antigravity\brain\31728b2f-b74d-4c33-a773-734d21a18c76"

mappings = {
    "Construction": f"{base_dir}\\type_construction_1776112265445.png",
    "Installation": f"{base_dir}\\type_installation_1776112279479.png",
    "Maintenance": f"{base_dir}\\type_maintenance_1776112295052.png",
    "Consulting": f"{base_dir}\\type_consulting_1776112311390.png",
}

for t, path in mappings.items():
    out_path = f"images/type_{t.lower()}.webp"
    try:
        optimize_and_save(path, out_path)
    except Exception as e:
        print(f"Error processing {path}: {e}")

print("Done")
