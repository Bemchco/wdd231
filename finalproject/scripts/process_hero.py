from PIL import Image
import io

def optimize_and_save(img_path, output_path):
    img = Image.open(img_path).convert('RGB')
    # Resize for hero banner. Width=1000 is good for typical container sizes without blowing up file size.
    img = img.resize((1000, 500), Image.Resampling.LANCZOS)
    quality = 90
    while True:
        out_bytes = io.BytesIO()
        img.save(out_bytes, format='WEBP', quality=quality)
        size_kb = len(out_bytes.getvalue()) / 1024
        
        if size_kb <= 125 or quality <= 10:
            with open(output_path, 'wb') as f:
                f.write(out_bytes.getvalue())
            print(f"Saved hero {output_path} with size {size_kb:.2f} KB, quality {quality}")
            break
        quality -= 5

img_path = r"C:\Users\BemchcoPC\.gemini\antigravity\brain\31728b2f-b74d-4c33-a773-734d21a18c76\hero_image_1776112372552.png"
optimize_and_save(img_path, "images/hero.webp")
