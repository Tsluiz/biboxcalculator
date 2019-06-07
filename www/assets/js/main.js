var url = "https://fw59ntyiv8.execute-api.eu-west-3.amazonaws.com/BIXRewardcalculator";

// Set event listener on form submission
// Adjust the input data in a format, needed for the API call
$("form").submit(function(event){
  $(".loader").toggle();
  var formData = $(this).serializeArray();
  event.preventDefault(formData);
  formData = objectifyForm(formData);
  calculateReward(formData);
});

// Function to get the form data in json format
function objectifyForm(formArray) {
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  if(returnArray <= 0) {
    return document.alert('Less than 0 BIX amount is no option! Get more than 0!');
  }
  else{
    return returnArray;
  }
}

// Function to make an API request to calculate the reward and current worth
function calculateReward(formData) {
  $.post(url, formData, function(response){
    var responseBody = JSON.parse(response["body"]);
    console.log(responseBody);
    showResponse(responseBody);
  });
}

// Function to round the numbers to 2 decimals
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

// Function to show the response on the html
function showResponse(responseBody) {
  var rewardDaily = responseBody["reward"];
  var worth = responseBody["yourBiboxWorth"];
  var rewardWeekly = rewardDaily * 7;
  var rewardMonthly = rewardDaily * 30.5;
  var rewardYearly = rewardDaily * 365;
  var x = document.getElementById("bixreward_load");
  $(".loader").toggle();
  $("#bixDailyReward").html("$" + precisionRound(rewardDaily, 2));
  $("#bixworthresult").html("$" + precisionRound(worth, 2));
  $("#bixWeeklyReward").html("$" + precisionRound(rewardWeekly, 2));
  $("#bixMonthlyReward").html("$" + precisionRound(rewardMonthly, 2));
  $("#bixYearlyReward").html("$" + precisionRound(rewardYearly, 2));
  $("#bixROI").html(precisionRound(((((rewardYearly+worth)-worth)/worth)*100), 2)+ "%");
  if (x.style.display === "none") {
    x.style.display = "block";
  };
};

