import json
import urllib.request
from urllib.parse import quote
from PIL import Image
import io
import time

def optimize_and_save(img_data, output_path):
    img = Image.open(io.BytesIO(img_data)).convert('RGB')
    quality = 90
    while True:
        out_bytes = io.BytesIO()
        img.save(out_bytes, format='WEBP', quality=quality)
        size_kb = len(out_bytes.getvalue()) / 1024
        
        if size_kb <= 125 or quality <= 10:
            with open(output_path, 'wb') as f:
                f.write(out_bytes.getvalue())
            print(f"Saved {output_path} with size {size_kb:.2f} KB, quality {quality}")
            break
        quality -= 5

def main():
    json_path = 'data/projects.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        projects = json.load(f)
        
    unique_types = list(set(p['type'] for p in projects))
    type_images = {}
    
    for t in unique_types:
        prompt = f"Highly professional photograph of a {t} industrial project, realistic, realistic lighting, highly detailed."
        prompt_encoded = quote(prompt)
        url = f"https://image.pollinations.ai/prompt/{prompt_encoded}?width=600&height=400&nologo=true"
        print(f"Fetching for type: {t}...")
        
        for attempt in range(5):
            try:
                # Need to use a different user agent or bypass cache occasionally
                req = urllib.request.Request(url + f"&seed={attempt}", headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=15) as response:
                    img_data = response.read()
                
                out_path = f"images/type_{t.lower()}.webp"
                optimize_and_save(img_data, out_path)
                type_images[t] = out_path
                break
            except Exception as e:
                print(f"Attempt {attempt+1} failed for {t}: {e}")
                time.sleep(5) # Delay to backoff from 429
                
        time.sleep(2)
                
    for p in projects:
        if p['type'] in type_images:
            p['image'] = type_images[p['type']]
                
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)
        
if __name__ == '__main__':
    main()
