$(document).ready(function () {
  // Single select dropdown code
  $(".basic_custom_dropdown .dropdown-menu span").click(function () {
    var selectedOption = $(this).text();
    var dropdownButton = $(this)
      .closest(".basic_custom_dropdown")
      .find(".dropdown-toggle");
    dropdownButton.text(selectedOption);
  });

  // Multi-select dropdown code
  $(".basic_custom_dropdown .dropdown-menu input[type='checkbox']").change(
    function () {
      var selectedOptions = [];
      var dropdownButton = $(this)
        .closest(".basic_custom_dropdown")
        .find(".dropdown-toggle");
      var dropdownMenu = $(this).closest(".dropdown-menu");

      dropdownMenu.find('input[type="checkbox"]:checked').each(function () {
        var optionText = $(this)
          .closest(".dropdown-item")
          .find(".form-check-label")
          .text()
          .trim();
        selectedOptions.push(optionText);
      });

      dropdownButton.text(
        selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select option(s)"
      );
    }
  );

  $(".basic_custom_dropdown .dropdown-toggle").each(function () {
    var defaultText = $(this).text().trim();
    $(this).data("defaultText", defaultText);
  });

  $(".basic_custom_dropdown .dropdown-menu").on(
    "hidden.bs.dropdown",
    function () {
      var dropdownButton = $(this)
        .closest(".basic_custom_dropdown")
        .find(".dropdown-toggle");
      var defaultText = dropdownButton.data("defaultText");
      dropdownButton.text(defaultText);
    }
  );

  // Toggle between price button and prices
  var monthlyPrice = "$19";
  var yearlyPrice = "$32";
  $(".price_btn button").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    if ($(this).text() === "Monthly") {
      $("#monthlyPrice").text(monthlyPrice);
      $("#yearlyPrice").text(yearlyPrice);
    } else if ($(this).text() === "Yearly(Save 20%)") {
      $("#monthlyPrice").text("$182");
      $("#yearlyPrice").text("$307");
    }
  });

  // expiry date
  $("#expirationDate").on("input", function () {
    var value = $(this)
      .val()
      .replace(/[^0-9]/g, ""); // Remove non-numeric characters
    var formattedValue = formatExpirationDate(value); // Format MM/YY

    $(this).val(formattedValue); // Update the input value with formatted value
  });

  function formatExpirationDate(value) {
    var formattedValue = value.replace(/^(\d{2})/, "$1/"); // Add slash after the first 2 digits

    if (formattedValue.length > 3) {
      formattedValue = formattedValue.substr(0, 5); // Restrict to maximum 5 characters (MM/YY)
    }

    return formattedValue;
  }

  // password hide show functionlaity
  $(".hide_val").click(function () {
    // Find the associated password field and hide its value
    var passwordField = $(this)
      .closest(".position-relative")
      .find(".pass_field");
    passwordField.attr("type", "password");
    // Toggle visibility icons
    $(this).addClass("d-none");
    $(this).siblings(".show_val").removeClass("d-none");
  });
  $(".show_val").click(function () {
    // Find the associated password field and show its value
    var passwordField = $(this)
      .closest(".position-relative")
      .find(".pass_field");
    passwordField.attr("type", "text");
    // Toggle visibility icons
    $(this).addClass("d-none");
    $(this).siblings(".hide_val").removeClass("d-none");
  });

  $("#cardNumber").on("input", function (e) {
    var key = e.which || e.keyCode || 0;
    var cardNumber = $(this).val().replace(/\s/g, ""); // Remove any existing spaces
    cardNumber = cardNumber.replace(/[^\d]/g, ""); // Remove any non-numeric characters

    if (cardNumber.length > 16) {
      cardNumber = cardNumber.substr(0, 16); // Limit the card number to 16 digits
    }

    if (cardNumber.length > 0) {
      cardNumber = cardNumber.match(new RegExp(".{1,4}", "g")).join(" "); // Add space after every 4 digits
    }

    $(this).val(cardNumber); // Update the input value with the formatted card number

    if (cardNumber.length === 19) {
      $(".check_color").css("color", "#1660CF"); // Change the color of .check_color to #1660CF
    } else {
      $(".check_color").css("color", "#828282"); // Reset the color of .check_color
    }

    if (key === 8) {
      e.preventDefault();
      var cursorPosition = this.selectionStart;
      if (cursorPosition > 0) {
        cardNumber = cardNumber.replace(/\s/g, ""); // Remove spaces for correct deletion
        cardNumber =
          cardNumber.substr(0, cursorPosition - 1) +
          cardNumber.substr(cursorPosition); // Remove the character at the cursor position
        cardNumber = cardNumber.match(new RegExp(".{1,4}", "g")).join(" "); // Reformat the card number with spaces
        $(this).val(cardNumber); // Update the input value without the removed character
        this.selectionStart = cursorPosition - 1;
        this.selectionEnd = cursorPosition - 1;
      }
    }
  });
});
