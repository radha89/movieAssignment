/**
 * Created by radhabhambwani on 16-03-12.
 */
$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "asn2.xml",
        success: handleResponse
    });

    $(".title").html();

}); //end ready


function handleResponse(xml) {

    var n = 0;

    var imdbLinks = ["http://www.imdb.com/title/tt0120689/",
                     "http://www.imdb.com/title/tt0253474/",
                     "http://www.imdb.com/title/tt0468569/"];

    var theatreLinks = ["http://www.cineplex.com/Movie/the-green-mile",
                       "http://www.cineplex.com/Movie/the-pianist-BL4742465",
                       "http://www.cineplex.com/Movie/the-dark-knight-the-event-screen"];


    $(xml).find("movie").each(function () {
        $("#m" + n).append("<img src='" + $(this).find("moviename").attr("image") + "' width='60' height='60'>" +
                          $(this).find("moviename").text() + "<br>");
        $("#s" + n + " > div.ui-block-b").append("<img class='largeimg' src='" + $(this).find("moviename").attr("image") +
                                                 "' width='100' height='100'>" +
                                                 "<h2>Movie Plot</h2>" +
                                                 "<p class='plot'>" + $(this).find("movieplot").text() + "</p>" +
                                                 "<div data-role='collapsible'>" +
                                                 "<h3>Click for more info...</h3>" +
                                                 "<p><a href='" + imdbLinks[n] + "' target='_blank' " +
                                                 "class='ui-btn ui-btn-icon-left ui-corner-all'>IMDB</a></p>" +
                                                 "<p><a href='" + theatreLinks[n] + "' target='_blank' " +
                                                 "class='ui-btn ui-btn-icon-left ui-corner-all'>Cineplex</a></p>" +
                                                 "</div>").enhanceWithin(); //http://api.jquerymobile.com/enhanceWithin/
                                                 //used enhanceWithin() to make collapsible dynamic

        $(this).find("review").each(function() {
            $("#s" + n + " > div.ui-block-c").append("<p>\"" + $(this).text() + "\"</p><br>");
        });
        n++;
    });

    n = 0; //reset n to 0;

    $(xml).find("castlist").each(function() {
        $(this).find("actor").each(function () {
            $("#s" + n + " > div.ui-block-a").append("<p>" + $(this).attr("name") + " plays " +
                                                     $(this).find("role").text() + "</p><br>");
        });
        n++;
    });

    $(".title").html($(xml).find("pagetitle").text());
    $("footer").append("<p>" + $(xml).find("name").text() + "  |  " +
                       $(xml).find("name").attr("studentNumber") + "  |  " +
                       $(xml).find("name").attr("program") + "</p>");
}

