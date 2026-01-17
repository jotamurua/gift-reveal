const wrapper = document.getElementById("wrapper");
const sound = document.getElementById("sound");
let soundUnlocked = false;

let opened = false;

const message = document.getElementById("message");

let step = 0;

function openGift() {
  step++;

  if (step === 1) {
    // if (!soundUnlocked) {
    //   sound.play().then(() => {
    //     sound.pause();
    //     sound.currentTime = 0;
    //     soundUnlocked = true;
    //   }).catch(() => {});
    // }
  
    wrapper.classList.add("ribbons-off");
    return;
  }
  
  

  // Paso 2: se va el papel
  if (step === 2) {
    wrapper.classList.add("opened");
    return;
  }

  // Paso 3: final
  if (step === 3) {
    message.hidden = false;
    message.classList.add("show");
    launchConfetti();
    playSound();
  }
}


const isTouch = "ontouchstart" in window;

if (isTouch) {
  wrapper.addEventListener("touchstart", openGift, { passive: true });
} else {
  wrapper.addEventListener("click", openGift);
}

let canvas, ctx;

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("confetti");
  ctx = canvas.getContext("2d");
  resizeCanvas();
});


function launchConfetti() {
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 3,
      v: Math.random() * 4 + 2
    }));
  
    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      pieces.forEach(p => {
        p.y += p.v;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
  
      frame++;
      if (frame < 150) requestAnimationFrame(animate);
    }
  
    animate();
  }


function playSound() {
  if (!soundUnlocked) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

  


function resizeCanvas() {
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
  