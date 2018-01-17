function writeToTextField(text, color="red", seconds=2) {
    $('#textField').text(text);
    $('#textFieldContainer').css('color', color);
    setTimeout(function(){
        $('#textField').text("");
    }, 1000 * seconds);
}