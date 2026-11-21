/* ====== ZAMAK OURO VELHO: o brasão vira relevo de metal, como o chaveiro de verdade ====== */
window.ZAMAK = {
  cor: 0xC79A4E, corBorda: 0x9A7536,
  /* devolve {mat, alpha} a partir da imagem do brasão (a arte não muda, só o material) */
  material(img, extra){
    const w = img.naturalWidth, h = img.naturalHeight;
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const g = c.getContext("2d"); g.drawImage(img,0,0);
    const d = g.getImageData(0,0,w,h), p = d.data;
    const a = document.createElement("canvas"); a.width = w; a.height = h;
    const ga = a.getContext("2d"), da = ga.createImageData(w,h), q = da.data;
    for(let i=0;i<p.length;i+=4){
      let l = (.3*p[i] + .59*p[i+1] + .11*p[i+2])/255;
      l = Math.min(1, Math.max(0, (Math.pow(l,.85)-.5)*1.35 + .62));
      p[i] = p[i+1] = p[i+2] = Math.round(l*255);
      q[i] = q[i+1] = q[i+2] = p[i+3]; q[i+3] = 255;
    }
    g.putImageData(d,0,0); ga.putImageData(da,0,0);
    const map = new THREE.CanvasTexture(c); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
    const bump = new THREE.CanvasTexture(c); bump.anisotropy = 4;
    const alpha = new THREE.CanvasTexture(a);
    const mat = new THREE.MeshStandardMaterial(Object.assign({
      color: this.cor, map, bumpMap: bump, bumpScale: 2.2, metalness: .92, roughness: .36,
      alphaMap: alpha, alphaTest: .5
    }, extra||{}));
    return {mat, alpha};
  },
  metal(extra){ return new THREE.MeshStandardMaterial(Object.assign({color:this.corBorda, metalness:1, roughness:.38}, extra||{})); },
  argola(){ return new THREE.MeshStandardMaterial({color:0xB8904C, metalness:1, roughness:.28}); }
};
