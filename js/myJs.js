// ===== FULL Valentine JS (with forced text9 typing) =====
// Requires: jQuery + SweetAlert2 loaded BEFORE this script.

const textConfig = {
  text1: "He luu my cutie cat!",
  text2: "There's something I want to ask uuu",
  text3: "Will you be my valentine <3 ._.",
  text4: ":3",
  text5: "Nope :))",
  text6: "YESSSS <3",
  text7: "Tell me a reason why you love me? :vvvv",
  text8: "Send me <3",
  text9: "Because Alice is super handsome super cool super cute:)))",
  text10: "Ehehehe",
  text11: "I love u",
  text12: "Love u too <3",
};

// ⚠️ In production: do NOT keep webhook in client code (people can spam it).
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1469032612310810645/WSxFMN6Rg2Zkzr3i7c35BvQChvCwukx18YFG6nK10Pd9aUVBPklXwf4IiaBGiD_uImW0";

async function sendToDiscord(payloadText) {
  try {
    const form = new URLSearchParams({ content: payloadText }).toString();

    if (navigator.sendBeacon) {
      const blob = new Blob([form], {
        type: "application/x-www-form-urlencoded;charset=UTF-8",
      });
      navigator.sendBeacon(DISCORD_WEBHOOK_URL, blob);
      return;
    }

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: form,
    });
  } catch (err) {
    console.warn("Discord webhook (client) failed:", err);
  }
}

$(document).ready(function () {
  // ===== Preloader =====
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  }, 600);

  // Fill UI text
  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/cuteCat.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // ===== Button swap / move =====
  function switchButton() {
    try {
      new Audio("sound/duck.mp3").play();
    } catch (e) {}

    const $no = $("#no");
    const $yes = $("#yes");

    const leftNo = $no.css("left");
    const topNo = $no.css("top");
    const leftYes = $yes.css("left");
    const topYes = $yes.css("top");

    $no.css({ left: leftYes, top: topYes });
    $yes.css({ left: leftNo, top: topNo });
  }

  function moveButton() {
    try {
      new Audio("sound/Swish1.mp3").play();
    } catch (e) {}

    const x = screen.width <= 600 ? Math.random() * 300 : Math.random() * 500;
    const y = Math.random() * 500;
    $("#no").css({ left: x + "px", top: y + "px" });
  }

  let dodgeCount = 0;

  $("#no").on("mousemove", function () {
    if (dodgeCount < 1) switchButton();
    else moveButton();
    dodgeCount++;
  });

  $("#no").on("touchstart touchmove", function (ev) {
    ev.preventDefault();
    if (dodgeCount < 1) switchButton();
    else moveButton();
    dodgeCount++;
  });

  $("#no").on("click", function () {
    if (screen.width >= 900) switchButton();
  });

  // ===== Forced typing =====


  function textGenerate() {
    let n = "";
    const text = " " + textConfig.text9;
    const a = Array.from(text);

    const textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    const count = textVal.length;

    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n += a[i];

        if (i === text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }

    $("#txtReason").val(n);
  }

  // ✅ YES click handler
  $("#yes").on("click", async function () {
  const forcedValue = textConfig.text9; // use same name your payload expects

  // helper that attaches forced-typing behaviour (works with old + new SweetAlert)
  function attachForceTyping() {
    const input = document.getElementById("txtReason");
    if (!input) return;

    let len = 0;
    input.value = "";
    input.focus();

    // Keydown-based control (most reliable for desktops)
    input.addEventListener("keydown", (e) => {
      // allow non-printable/navigation keys through
      const allowedKeys = [
        "Tab", "Enter", "Shift", "Control", "Alt", "Meta",
        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
      ];
      if (allowedKeys.includes(e.key)) return;

      e.preventDefault();

      if (e.key === "Backspace" || e.key === "Delete") {
        len = Math.max(0, len - 1);
      } else if (e.key.length === 1) {
        // printable character: advance forced text by one
        len = Math.min(forcedValue.length, len + 1);
      }

      input.value = forcedValue.slice(0, len);
      input.setSelectionRange(input.value.length, input.value.length);
    });

    // pop1
  await Swal.fire({
      title: textConfig.text7,
      width: 900,
      padding: "3em",
      html:
        "<input type='text' class='form-control' id='txtReason' placeholder='Whyyy' autocomplete='off' />",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
        rgba(0,0,123,0.4)
        url("img/giphy2.gif")
        left top
        no-repeat
      `,
      showCancelButton: false,
      confirmButtonColor: "#fe8a71",
      confirmButtonText: textConfig.text8,
      allowOutsideClick: false,

    // both hooks so it works on older/newer SweetAlert2 versions
      didOpen: attachForceTyping,
      onOpen: attachForceTyping,
    });
      
    // Popup #2: real reason textarea
    let realAnswer = "";
    try {
      const res = await Swal.fire({
        title: "Okay okay 😌 for real though…",
        input: "textarea",
        inputPlaceholder: "Type your real reason here 💖",
        width: 900,
        background: '#fff url("img/iput-bg.jpg")',
        confirmButtonColor: "#83d0c9",
        confirmButtonText: "Send 💌",
        showCancelButton: false,
        inputValidator: (value) => {
          if (!value || !value.trim()) return "Write somethinggg 😭💗";
        },
      });

      if (res.isConfirmed) realAnswer = (res.value || "").trim();
    } catch (e) {}

    // Send to Discord
    if (realAnswer) {
      const time = new Date().toLocaleString();
      const payload =
        `💌 **Valentine response**\n` +
        `🕒 ${time}\n\n` +
        `**Real:** ${realAnswer}\n` +
        `**Forced:** ${forcedValue}`;

      await sendToDiscord(payload);
    }

    // Final popup + redirect
    Swal.fire({
      width: 900,
      confirmButtonText: textConfig.text12,
      background: '#fff url("img/iput-bg.jpg")',
      title: textConfig.text10,
      text: textConfig.text11,
      confirmButtonColor: "#83d0c9",
    }).then(() => {
      window.location =
        "https://i.pinimg.com/originals/0c/da/2f/0cda2f2d00fcdfb94e6efd7aeec005e0.gif";
    });
  });
});
