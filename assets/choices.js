$(document).ready(function () {
  var currentStep, nextStep, previousStep;
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var opSelected1 = 0;
  var opSelected2 = 0;
  var opSelected3 = 0;
  var optionsSelected = 0;

  setProgressBar(current);

  $(".next-step").click(function () {
    if (!$("#dinner-option").hasClass("show")) {
      $("fieldset").remove("#dinner-option");
    }
    if (!$("#drink-option").hasClass("show")) {
      $("fieldset").remove("#drink-option");
    } else {
    }
    if (!$("#movie-option").hasClass("show")) {
      $("fieldset").remove("#movie-option");
    }

    optionsSelected = opSelected1 + opSelected2 + opSelected3;
    console.log(optionsSelected);
    createProgressBar(optionsSelected);

    currentStep = $(this).parent();
    nextStep = $(this).parent().next();

    $("#progressbar button")
      .eq($("fieldset").index(nextStep))
      .addClass("active");

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
    //if(index)
    currentStep = $(this).parent();
    previousStep = $(this).parent().prev();
    console.log(current);

    if (current === 2) {
      location.reload();
    }
    $("#progressbar button")
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
  var progressBar = false;
  function createProgressBar(num) {
    if (!progressBar) {
      for (let index = 0; index < num; index++) {
        var barEl = $("<div></div>");

        barEl.addClass("progressBar-item");

        $("#progressbar").append(barEl);
      }
      progressBar = true;
    }
  }
  function setProgressBar(current) {
    var percent = parseFloat(100 / steps) * current;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $("#dinner-choice").on("click", function () {
    $(this).toggleClass("selected-choice");
    $("#dinner-option").toggleClass("show");

    if (opSelected1 > 0) {
      opSelected1--;
    } else {
      opSelected1++;
    }
    console.log(opSelected1);
  });
  $("#drink-choice").on("click", function () {
    $(this).toggleClass("selected-choice");
    $("#drink-option").toggleClass("show");

    if (opSelected2 > 0) {
      opSelected2--;
    } else {
      opSelected2++;
    }
    console.log(opSelected2);
  });
  $("#movie-choice").on("click", function () {
    $(this).toggleClass("selected-choice");
    $("#movie-option").toggleClass("show");

    if (opSelected3 > 0) {
      opSelected3--;
    } else {
      opSelected3++;
    }
    console.log(opSelected3);
  });

  //   $("#next").click(function () {

  // });

  // $("fieldset").remove("#dinner-option");
  // $("fieldset").remove("#drink-option");
  // $("fieldset").remove("#movie-option");

  // var index = 0;
  // var divsLength = 4;

  // divs = $(".divs").children();

  // $("#prev").hide();
  // $("#next").click(function () {
  //   if (!$("#dinner-option").hasClass("show")) {
  //     $("fieldset").remove("#dinner-option");
  //   }
  //   if (!$("#drink-option").hasClass("show")) {
  //     $("fieldset").remove("#drink-option");
  //   }
  //   if (!$("#movie-option").hasClass("show")) {
  //     $("fieldset").remove("#movie-option");
  //   }

  //   divsLength = divChildren1 + opSelected2 + opSelected3;

  //   index = (index + 1) % divs.length;
  //   divs.eq(index).show().siblings().hide();
  //   if (index > 0) {
  //     $("#prev").show();
  //   } else {
  //     $("#prev").hide();
  //   }
  //   console.log("index: " + index);
  //   console.log("divsLength: " + divsLength);
  //   if (divsLength === index) {
  //     $("#next").hide();
  //   } else {
  //     $("#next").show();
  //   }
  // });
  // $("#prev").click(function () {
  //   index = (index - 1) % divs.length;
  //   divs.eq(index).show().siblings().hide();
  //   if (index > 0) {
  //     $("#prev").show();
  //     $("#next").show();
  //   } else {
  //     $("#prev").hide();
  //   }
});
