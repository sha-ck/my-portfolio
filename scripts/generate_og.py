import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image(output_path: str = "public/og-image.png"):
    W, H = 1200, 630
    
    # 1. Base canvas: dark void (#05070c)
    canvas = Image.new("RGBA", (W, H), (5, 7, 12, 255))
    
    # 2. Ambient glows (Living System computational organism vibe)
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Top-right violet & blue nebula (#8875ff and #58c7ff)
    glow_draw.ellipse([690, 30, 1170, 510], fill=(136, 117, 255, 65))
    glow_draw.ellipse([780, 140, 1200, 560], fill=(88, 199, 255, 80))
    glow_draw.ellipse([670, 310, 990, 610], fill=(94, 242, 166, 50))
    
    # Left-bottom subtle mint & blue glow
    glow_draw.ellipse([-90, 340, 380, 710], fill=(88, 199, 255, 35))
    glow_draw.ellipse([180, 470, 620, 760], fill=(94, 242, 166, 30))
    
    # Blur the glow layer heavily
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(85))
    canvas = Image.alpha_composite(canvas, glow_layer)
    
    # 3. Technical background grid & constellation lines
    grid_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    
    grid_size = 40
    # Fine grid lines
    for x in range(40, W - 40, grid_size):
        grid_draw.line([(x, 40), (x, H - 40)], fill=(38, 51, 66, 25), width=1)
    for y in range(40, H - 40, grid_size):
        grid_draw.line([(40, y), (W - 40, y)], fill=(38, 51, 66, 25), width=1)
        
    # Subtle coordinate points / crosshairs at some grid intersections
    for x in range(120, W - 120, 160):
        for y in range(120, H - 120, 160):
            grid_draw.line([(x - 3, y), (x + 3, y)], fill=(88, 199, 255, 55), width=1)
            grid_draw.line([(x, y - 3), (x, y + 3)], fill=(88, 199, 255, 55), width=1)
            
    canvas = Image.alpha_composite(canvas, grid_layer)
    
    # 4. Border frame with tech accents
    frame_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    frame_draw = ImageDraw.Draw(frame_layer)
    
    # Outer subtle rounded border
    margin = 32
    frame_draw.rounded_rectangle(
        [margin, margin, W - margin, H - margin],
        radius=20,
        outline=(38, 51, 66, 140),
        width=1
    )
    
    # Corner accent brackets
    c_len = 16
    corners = [
        (margin, margin, 1, 1),
        (W - margin, margin, -1, 1),
        (margin, H - margin, 1, -1),
        (W - margin, H - margin, -1, -1)
    ]
    for cx, cy, dx, dy in corners:
        frame_draw.line([(cx, cy), (cx + dx * c_len, cy)], fill=(94, 242, 166, 200), width=2)
        frame_draw.line([(cx, cy), (cx, cy + dy * c_len)], fill=(94, 242, 166, 200), width=2)
        
    canvas = Image.alpha_composite(canvas, frame_layer)
    
    # 5. Right side: Computational Organism & Portrait
    px, py = 925, 315
    pr = 175
    
    # Organism constellation nodes & connecting lines behind/around portrait
    organism_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    org_draw = ImageDraw.Draw(organism_layer)
    
    nodes = [
        (710, 130, 4, (94, 242, 166, 180)),
        (765, 215, 5, (88, 199, 255, 200)),
        (685, 330, 4, (136, 117, 255, 180)),
        (735, 450, 6, (94, 242, 166, 220)),
        (815, 520, 4, (88, 199, 255, 170)),
        (1095, 120, 4, (88, 199, 255, 180)),
        (1135, 255, 5, (94, 242, 166, 200)),
        (1115, 440, 4, (136, 117, 255, 180)),
        (1055, 525, 5, (88, 199, 255, 190)),
        (865, 95, 3, (94, 242, 166, 150)),
        (995, 85, 3, (88, 199, 255, 150)),
    ]
    
    node_coords = [(n[0], n[1]) for n in nodes]
    for i in range(len(node_coords)):
        for j in range(i + 1, len(node_coords)):
            x1, y1 = node_coords[i]
            x2, y2 = node_coords[j]
            dist = math.hypot(x2 - x1, y2 - y1)
            if dist < 170:
                alpha = int(120 * (1 - dist / 170))
                org_draw.line([(x1, y1), (x2, y2)], fill=(88, 199, 255, alpha), width=1)
                
    for nx, ny, nr, col in nodes:
        org_draw.ellipse([nx - nr - 3, ny - nr - 3, nx + nr + 3, ny + nr + 3], fill=(col[0], col[1], col[2], 40))
        org_draw.ellipse([nx - nr, ny - nr, nx + nr, ny + nr], fill=col)
        
    canvas = Image.alpha_composite(canvas, organism_layer)
    
    # Load and process Portrait
    portrait_path = "public/images/portrait.jpg"
    if os.path.exists(portrait_path):
        p_img = Image.open(portrait_path).convert("RGBA")
        
        # Center crop square
        min_dim = min(p_img.width, p_img.height)
        left = (p_img.width - min_dim) // 2
        top = int((p_img.height - min_dim) * 0.25)
        p_cropped = p_img.crop((left, top, left + min_dim, top + min_dim))
        
        target_size = pr * 2
        p_resized = p_cropped.resize((target_size, target_size), Image.Resampling.LANCZOS)
        
        mask = Image.new("L", (target_size, target_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse([0, 0, target_size - 1, target_size - 1], fill=255)
        
        # Halo glow behind portrait ring
        halo_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        halo_draw = ImageDraw.Draw(halo_layer)
        halo_draw.ellipse([px - pr - 14, py - pr - 14, px + pr + 14, py + pr + 14], fill=(88, 199, 255, 120))
        halo_draw.ellipse([px - pr - 8, py - pr - 8, px + pr + 8, py + pr + 8], fill=(94, 242, 166, 140))
        halo_layer = halo_layer.filter(ImageFilter.GaussianBlur(14))
        canvas = Image.alpha_composite(canvas, halo_layer)
        
        # Paste portrait onto canvas
        canvas.paste(p_resized, (px - pr, py - pr), mask)
        
        # Draw gradient-colored border rings around portrait
        ring_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ring_draw = ImageDraw.Draw(ring_layer)
        
        ring_draw.ellipse([px - pr - 8, py - pr - 8, px + pr + 8, py + pr + 8], outline=(88, 199, 255, 70), width=1)
        for deg in range(0, 360, 2):
            t = deg / 360.0
            if t < 0.33:
                s = t / 0.33
                r = int(94 * (1 - s) + 88 * s)
                g = int(242 * (1 - s) + 199 * s)
                b = int(166 * (1 - s) + 255 * s)
            elif t < 0.66:
                s = (t - 0.33) / 0.33
                r = int(88 * (1 - s) + 136 * s)
                g = int(199 * (1 - s) + 117 * s)
                b = int(255 * (1 - s) + 255 * s)
            else:
                s = (t - 0.66) / 0.34
                r = int(136 * (1 - s) + 94 * s)
                g = int(117 * (1 - s) + 242 * s)
                b = int(255 * (1 - s) + 166 * s)
            ring_draw.arc([px - pr, py - pr, px + pr, py + pr], start=deg, end=deg + 3, fill=(r, g, b, 240), width=3)
            
        canvas = Image.alpha_composite(canvas, ring_layer)
        
    # Floating interactive badges around portrait
    chip_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    chip_draw = ImageDraw.Draw(chip_layer)
    font_mono_small = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 13)
    
    # Chip 1: "● Notch · Senior SWE"
    c1_w, c1_h = 195, 34
    c1_x, c1_y = 875, 82
    chip_draw.rounded_rectangle([c1_x, c1_y, c1_x + c1_w, c1_y + c1_h], radius=17, fill=(13, 20, 36, 225), outline=(88, 199, 255, 130), width=1)
    chip_draw.ellipse([c1_x + 14, c1_y + 14, c1_x + 21, c1_y + 21], fill=(94, 242, 166, 255))
    chip_draw.text((c1_x + 30, c1_y + c1_h // 2), "Notch · Senior SWE", font=font_mono_small, fill=(238, 244, 242, 235), anchor="lm")
    
    # Chip 2: "● AI Product Systems"
    c2_w, c2_h = 190, 34
    c2_x, c2_y = 715, 480
    chip_draw.rounded_rectangle([c2_x, c2_y, c2_x + c2_w, c2_y + c2_h], radius=17, fill=(13, 20, 36, 225), outline=(136, 117, 255, 130), width=1)
    chip_draw.ellipse([c2_x + 14, c2_y + 14, c2_x + 21, c2_y + 21], fill=(136, 117, 255, 255))
    chip_draw.text((c2_x + 30, c2_y + c2_h // 2), "AI Product Systems", font=font_mono_small, fill=(238, 244, 242, 235), anchor="lm")
    
    canvas = Image.alpha_composite(canvas, chip_layer)
    
    # 6. Typography & Content on Left Side
    text_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(text_layer)
    
    font_pill = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 13)
    font_h1 = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 52)
    font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 25)
    font_body = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18)
    font_tag = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 13)
    font_url = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 13)
    
    left_x = 76
    
    # Top Status Badge: LIVING SYSTEM • PORTFOLIO
    pill_y = 78
    pill_w = 300
    pill_h = 34
    draw.rounded_rectangle(
        [left_x, pill_y, left_x + pill_w, pill_y + pill_h],
        radius=17,
        fill=(13, 20, 36, 220),
        outline=(38, 51, 66, 210),
        width=1
    )
    # Mint pulsing beacon dot
    draw.ellipse([left_x + 13, pill_y + 10, left_x + 25, pill_y + 22], fill=(94, 242, 166, 60))
    draw.ellipse([left_x + 15, pill_y + 12, left_x + 23, pill_y + 20], fill=(94, 242, 166, 255))
    draw.text((left_x + 35, pill_y + pill_h // 2), "LIVING SYSTEM  •  PORTFOLIO", font=font_pill, fill=(94, 242, 166, 240), anchor="lm")
    
    # Primary Name H1
    h1_y = 138
    draw.text((left_x, h1_y), "Shanid Cherukattil", font=font_h1, fill=(238, 244, 242, 255))
    
    # Hybrid Role / Headline
    sub_y = 212
    draw.text((left_x, sub_y), "Software Engineer × AI Product Engineer", font=font_sub, fill=(88, 199, 255, 255))
    
    # Mission Statement / Intro Paragraph
    body_y = 265
    line1 = "Building resilient frontend systems, living interfaces,"
    line2 = "and AI-enabled product workflows with thoughtful craft."
    draw.text((left_x, body_y), line1, font=font_body, fill=(165, 177, 190, 240))
    draw.text((left_x, body_y + 28), line2, font=font_body, fill=(165, 177, 190, 240))
    
    # Capability / Tech Stack Tags
    tags_y = 368
    tags = ["Next.js", "TypeScript", "React & Vue", "AI Workflows", "Creative WebGL"]
    cur_x = left_x
    for tag in tags:
        bbox = font_tag.getbbox(tag)
        tw = bbox[2] - bbox[0]
        pad_x = 14
        pad_y = 8
        tag_w = tw + pad_x * 2
        tag_h = 32
        
        draw.rounded_rectangle(
            [cur_x, tags_y, cur_x + tag_w, tags_y + tag_h],
            radius=8,
            fill=(13, 20, 36, 190),
            outline=(38, 51, 66, 190),
            width=1
        )
        draw.text((cur_x + tag_w // 2, tags_y + tag_h // 2), tag, font=font_tag, fill=(238, 244, 242, 220), anchor="mm")
        cur_x += tag_w + 10
        
    # Bottom Divider & Site URL
    foot_y = 475
    draw.line([(left_x, foot_y), (left_x + 580, foot_y)], fill=(38, 51, 66, 110), width=1)
    
    # Domain / Metadata display
    meta_y = foot_y + 24
    draw.text((left_x, meta_y), "EXPLORE WORK & LAB", font=font_pill, fill=(94, 242, 166, 210))
    
    url_text = "•  shanid-portfolio.shanid0cherukattil.workers.dev"
    draw.text((left_x + 200, meta_y), url_text, font=font_url, fill=(165, 177, 190, 180))
    
    canvas = Image.alpha_composite(canvas, text_layer)
    
    # Ensure target directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Convert to RGB (standard 24-bit PNG for social card scrapers)
    final_image = canvas.convert("RGB")
    final_image.save(output_path, "PNG", optimize=True, compress_level=9)
    print(f"Successfully generated {output_path} ({W}x{H})")

if __name__ == "__main__":
    create_og_image("public/og-image.png")
