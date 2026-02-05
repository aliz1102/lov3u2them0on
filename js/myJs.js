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
  text11:
    "I love u",
  text12: "Love u too <3",
};

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1469032612310810645/WSxFMN6Rg2Zkzr3i7c35BvQChvCwukx18YFG6nK10Pd9aUVBPklXwf4IiaBGiD_uImW0";

async function sendToDiscord(payloadText) {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: payloadText }),
    });
  } catch (err) {
    // fail silently (don’t ruin the valentine flow)
    console.error("Discord webhook failed:", err);
  }
}

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

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

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 600) {
      var x = Math.random() * 300;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 500;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        n = n + a[i];
        if (i == text.length + 1) {
          $("#txtReason").val("");
          n = "";
          break;
        }
      }
    }
    $("#txtReason").val(n);
  }

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).
      /*
      then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location = 'https://i.pinimg.com/originals/0c/da/2f/0cda2f2d00fcdfb94e6efd7aeec005e0.gif';
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});
*/
      }).then(async (result) => {
  if (!result.value) return;

  // Popup #2: real answer
  const { value: realAnswer } = await Swal.fire({
    title: "Okay okay 😌 for real though…",
    input: "textarea",
    inputPlaceholder: "Type your real reason here 💖",
    width: 900,
    background: '#fff url("img/iput-bg.jpg")',
    confirmButtonColor: "#83d0c9",
    confirmButtonText: "Send 💌",
    showCancelButton: true,
    cancelButtonText: "Skip",
    inputValidator: (value) => {
      if (!value || !value.trim()) return "Write somethinggg 😭💗";
    },
  });

  // Send to Discord (only if she wrote something)
  if (realAnswer && realAnswer.trim()) {
    const forced = (result.value || "").trim();
    const real = realAnswer.trim();
    const time = new Date().toLocaleString();

    await sendToDiscord(
      `💌 **Valentine response**\n🕒 ${time}\n\n**Real:** ${real}\n**Forced:** ${forced}`
    );
  }

  // Your final popup + redirect
  Swal.fire({
    width: 900,
    confirmButtonText: textConfig.text12,
    background: '#fff url("img/iput-bg.jpg")',
    title: textConfig.text10,
    text: textConfig.text11,
    confirmButtonColor: "#83d0c9",
    onClose: () => {
      window.location =
        "https://i.pinimg.com/originals/0c/da/2f/0cda2f2d00fcdfb94e6efd7aeec005e0.gif";
    },
  });
});
