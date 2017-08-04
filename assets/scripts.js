// function to grab wikipedia
function wikiSearch(searchTerm) {
  // build the URL to use ajax on
  var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json";
  $.ajax({
    url: wikiURL,
    dataType: "jsonp",
    success: buildDiv
  })
}

// build a div
function buildDiv(data) {
  // take an array
  // take the ith entry from 1,2,3 indexed positions for use as title, summary and link respectively
  // put into a div to be styled
  // example div:<a href="http://en.wikipedia.com/wiki/Example"><div class="container-fluid search-result">
  //   <h2 class="result-title">Example</h2>
  //   <p class="result-summary">This is some example text.</p>
  // </div></a>
  for (var i = 0, n = data[1].length; i < n; i++) {
    var resultTitle = data[1][i];
    var resultSummary = data[2][i];
    var resultLink = data[3][i];
    var newDiv = "<a href=" + "'" + resultLink + "' target='blank'><div class='container-fluid search-result'><h2 class='result-title'>" + resultTitle + "</h2><p class='result-summary'>" + resultSummary + "</p></div></a>";
    console.log(newDiv);
    $("#result-container").append(newDiv);
  }
}


// function on submit
function printInput(data) {
  console.log(data);
}

$(document).ready(function() {
  // when enter is pressed in the form:
  $("#search").keyup(function(e) {
    if (e.keyCode == 13) {
      var searchVal = $("#search").val();
      $("#result-container").text("");
      wikiSearch(searchVal);
    };
  });
});
