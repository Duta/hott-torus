window.onload = function() {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    var w = window.innerWidth;
    var h = window.innerHeight;
    c.width = w;
    c.height = h;
    var timer = null;
    var a = 1;
    var b = 1;
    var r1 = 1;
    var r2 = 2;
    var k1 = 300;
    var k2 = 5;
    var imageLinks = [
        'http://i.imgur.com/U25mAsV.png',
        'http://i.imgur.com/NCmx3DC.png',
        'http://i.imgur.com/zfwRDkB.png'
    ];
    var images = [];
    var loadedImages = 0;
    for(var i = 0; i < imageLinks.length; i++) {
        var image = new Image();
        image.onload = function() {
            loadedImages++;
        }
        image.src = imageLinks[i];
        images.push(image);
    }

    setInterval(function() {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, w, h);
        a += 0.07;
        b += 0.03;
        var sina = Math.sin(a);
        var sinb = Math.sin(b);
        var cosa = Math.cos(a);
        var cosb = Math.cos(b);
        var tau = 2 * Math.PI;
        var i = 0;
        for(var theta = 0; theta < tau; theta += 0.63) {
            var sintheta = Math.sin(theta);
            var costheta = Math.cos(theta);
            for(var phi = 0; phi < tau; phi += 0.315) {
                var sinphi = Math.sin(phi);
                var cosphi = Math.cos(phi);
                var objx = costheta*r1 + r2;
                var objy = sintheta*r1;
                var x = objx*(cosb*cosphi + sina*sinb*sinphi)
                    - objy*cosa*sinb;
                var y = objx*(sinb*cosphi - sina*cosb*sinphi)
                    + objy*cosa*cosb;
                var z = objx*cosa*sinphi + objy*sina + k2;
                var sx = w/2 + x*k1*(1/z);
                var sy = h/2 - y*k1*(1/z);
                var lum = 0.7*(cosphi*costheta*sinb
                    - cosa*costheta*sinphi
                    - sina*sintheta
                    + cosb*(cosa*sintheta - costheta*sina*sinphi));
                if(loadedImages < images.length) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(sx, sy, 3, 3);
                } else {
                    var image = images[i % images.length];
                    ctx.drawImage(image, sx - image.width/2, sy - image.height/2);
                }
                i++;
            }
        }
    }, 33);
}