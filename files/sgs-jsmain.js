let uu = "http://www.fkwapp.com/homeapi";
let vp = 0;

function ri() {
let ix = document.getElementById('ckimgwh').clientWidth / 1.50093808630394;
if (ix > 533) {
    ix = 533
}
document.querySelectorAll('.img-sgs').forEach(e => {
    e.style.height = ix + "px"
}
);
}

document.getElementById('go-to-sgs').addEventListener('click', function(event) {
    event.preventDefault();
    fetch(uu, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            s: "webinuser",
            ty: "sgsgoto"
        })
    }).catch();
    window.open(this.href, '_blank')
});
document.getElementById('video-id').addEventListener('play', function() {
    if (vp === 0) {
        fetch(uu, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                s: "webinuser",
                ty: "sgsvdo"
            })
        }).catch()
    }
    vp = 1
});
function getip(ip) {
    uu = uu + "?ip=" + ip.ip;
    fetch(uu, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            s: "webinuser",
            ty: "sgs"
        })
    }).catch()
}
window.addEventListener('resize', ri);
ri();
