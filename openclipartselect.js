/*! OpenclipartSelect by Ondrej Vrabel | pinf.sk | MIT license */

var search = "";
var totalPages;
var currentPage;

function searchClipart(keywords, page) {
    $(".results").html('<p class="text-center">Searching...</p><div class="loader"></div>');
    $.get("https://openclipart.org/search/json/?query=" + keywords + "&amount=20&page=" + page).done(function(
        data) {
        if (data.msg != "success") {
            $(".results").html('<p class="text-center">Error! Please, try again.</p>');
        } else if (data.info.results == 0) {
            $(".results").html('<p class="text-center">No results were found.</p>');
        } else {
            $(".results").html('');
            searchResults(data, page);


        }
    });
}

function searchResults(data, page) {
    data.payload.forEach(element => {
        var searchResult = $("<div></div>").attr("class", "search-result").html(
            '<div class="thumb" style="background-image:url(' + element.svg.png_thumb +
            ')"></div><p class="text-center">' + element.title + '</p>').click(function() {
            clipartSelected(element);
        });
        $(".results").append(searchResult);
    });

    $(".pagination").show();
    totalPages = data.info.pages;
    currentPage = page;

    var options_str = "";
    var i;

    for (i = 1; i <= totalPages; i++) {
        options_str += '<option value="' + i + '"' + (i == page ? ' selected="selected"' : '') + '>' + i +
            '</option>';
    }

    $(".pagination-select").html(options_str);



}

$(function() {
    $(".search-form").on("submit", function(e) {
        e.preventDefault();
        search = $("#search").val();
        searchClipart(search, 1);
    });

    $(".pg-prev").click(function(e) {
        e.preventDefault();
        if (currentPage != 1) {
            searchClipart(search, currentPage -= 1);
        }
    });

    $(".pg-next").click(function(e) {
        e.preventDefault();
        if (currentPage != totalPages) {
            searchClipart(search, currentPage += 1);
        }
    });


    $(".pagination-select").change(function() {
        var newPage = $(this).val();
        if (currentPage != newPage) {
            searchClipart(search, newPage);
        }
    });
});