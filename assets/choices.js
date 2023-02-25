$(document).ready(function () {
  var currentStep, nextStep, previousStep;
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".next-step").click(function () {
    currentStep = $(this).parent();
    nextStep = $(this).parent().next();

    $("#progressbar li").eq($("fieldset").index(nextStep)).addClass("active");

    nextStep.show();
    currentStep.animate(
      { opacity: 0 },
      {
        step: function (now) {
          opacity = 1 - now;

          currentStep.css({
            display: "none",
            position: "relative",
          });
          nextStep.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(++current);
  });

  $(".previous-step").click(function () {
    currentStep = $(this).parent();
    previousStep = $(this).parent().prev();

    $("#progressbar li")
      .eq($("fieldset").index(currentStep))
      .removeClass("active");

    previousStep.show();

    currentStep.animate(
      { opacity: 0 },
      {
        step: function (now) {
          opacity = 1 - now;

          currentStep.css({
            display: "none",
            position: "relative",
          });
          previousStep.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(currentStep) {
    var percent = parseFloat(100 / steps) * current;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }
});
