import base64, pathlib, sys
src = pathlib.Path(__file__).parent
fonts = pathlib.Path(sys.argv[1]); old = pathlib.Path(sys.argv[2]); out = pathlib.Path(sys.argv[3])
b64 = lambda p: base64.b64encode(p.read_bytes()).decode()
ff = ""
for fam, f in [("Manrope","manrope-latin.woff2")]:
    ff += '@font-face{font-family:"%s";font-style:normal;font-weight:200 800;font-display:swap;src:url(data:font/woff2;base64,%s) format("woff2")}\n' % (fam, b64(fonts/f))
t = (src/"template.html").read_text()
t = t.replace("/*FONTS*/", ff)
t = t.replace("/*LOGO*/", "data:image/svg+xml;base64," + b64(old/"img0.svg"))
em = (src/"emblem.svg").read_text().replace("/*FRAME*/","data:image/webp;base64,"+b64(old/"frame.webp")).replace("/*FIELDMASK*/","data:image/png;base64,"+b64(old/"field-mask.png"))
t = t.replace("<!--EMBLEM-->", em)
crests = ",".join('%s:"data:image/webp;base64,%s"' % (k, b64(old/("img%d.webp" % i))) for i,k in enumerate(["gri","cor","luf","son"],1))
t = t.replace("/*ESCUDOS*/", crests)
three = (old/"three-0.160.0.min.js").read_text().replace("</script","<\\/script")
t = t.replace("<script>/*THREE*/</script>", "<script>"+three+"</script>")
tr = old/"trilha.mp3"
t = t.replace("<script>/*SONS*/</script>", ('<script>window.TRILHA="data:audio/mpeg;base64,%s"</script>\n' % b64(tr) if tr.exists() else "") + "<script>/*SONS*/</script>")
for tag, f in [("ZAMAK","zamak.js"),("ABERTURA","abertura.js"),("QUIZ3D","quiz3d.js"),("SONS","sons.js")]:
    t = t.replace("<script>/*%s*/</script>" % tag, "<script>"+(src/f).read_text()+"</script>")
out.write_text(t); print(out, len(t))
# versão para Artifact: sem doctype/html/head/body (o publicador embrulha a página)
import re
a = re.sub(r"^<!doctype html>\s*<html[^>]*>\s*<head>\s*", "", t, flags=re.I)
a = a.replace('<meta charset="utf-8">\n','').replace('<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n','')
a = re.sub(r"</head>\s*<body>", "", a, count=1); a = re.sub(r"</body>\s*</html>\s*$", "", a)
a = a.replace("<title>Quiz das Casas</title>", '<title>Quiz das Casas</title>\n<script>document.documentElement.lang="pt-BR"</script>')
(out.parent/"artifact.html").write_text(a); print("artifact.html", len(a))
