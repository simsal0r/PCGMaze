function writeToTextField(text, color="white", seconds=2) {
    $('#textField').text(text);
    $('#textFieldContainer').css('color', color);
    setTimeout(function(){
        $('#textField').text("");
    }, 1000 * seconds);
}