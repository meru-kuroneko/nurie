/**
 * Very simple jQuery Color Picker.
 *
 * Copyright (C) 2008-2011 Andreas Lagerkvist
 * Copyright (C) 2012 Tanguy Krotoff
 *
 * Original source code and demo: http://andreaslagerkvist.com/jquery/colour-picker/
 *
 * License: http://creativecommons.org/licenses/by/3.0/
 */

(function($) {

  /**
   * Main color picker function.
   */
  $.fn.colorpicker = function(options) {
    options = $.extend({}, $.fn.colorpicker.defaults, options);

    // Inverts a hex-color
    var colorInvert = function(colorHex) {
      var r = colorHex.substr(0, 2);
      var g = colorHex.substr(2, 2);
      var b = colorHex.substr(4, 2);

      return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
    };

    var dialog = $('#colorpicker');
    if (!dialog.length) {
      dialog = $('<div id="colorpicker"></div>').appendTo(document.body).hide();
    }

    // Remove the color-picker if you click outside it
    $(document).click(function(event) {
      if (!($(event.target).is('#colorpicker') || $(event.target).parents('#colorpicker').length)) {
        dialog.hide(options.delay);
      }
    });

    // For HTML element passed to the plugin
    return this.each(function() {
      var element = $(this);

      // Build the list of colors
      // <li><a href="#" style="background-color: #111fff;">111fff</a></li>
      var colorList = '';
      $.each(options.colors, function(index, color) {
        colorList += '<li><a href="#" style="background-color: #' + color + ';">' + color + '</a></li>';
      });

      // When you click on the HTML element
      element.click(function() {
        // Show the dialog next to the HTML element
        var elementPos = element.offset();
        dialog.html('<ul>' + colorList + '</ul>').css({
          position: 'absolute',
          left: elementPos.left,
          top: elementPos.top + element.outerHeight()
        }).show(options.delay);

        // When you click on a color inside the dialog
        $('a', dialog).click(function() {
          // The color is stored in the link's value
          var color = $(this).text();

          // Change the input's background color to reflect the newly selected color
          element.css({
            'background-color': '#' + color,
            color: '#' + colorInvert(color)
          });

          element.trigger({
            type: 'changeColor',
            color: '#' + color
          });

          // Hide the color-picker and return false
          dialog.hide(options.delay);

          return false;
        });

        return false;
      });
    });
  };

  /**
   * Default color picker options.
   */
  $.fn.colorpicker.defaults = {
    // Default colors for the picker
    colors: [
             /*
      // Colors from Google Calendar
      '000000', // Black
      '7BD148', // Green
      '5484ED', // Bold blue
      'A4BDFC', // Blue
      '46D6DB', // Turquoise
      '7AE7BF', // Green
      '51B749', // Bold green
      'FBD75B', // Yellow
      'FFB878', // Orange
      'FF887C', // Red
      'DC2127', // Bold red
      'DBADFF', // Purple
      'E1E1E1', // Gray

      // More colors from Google Calendar
      'FFFFFF',
      'AC725E',
      'D06B64',
      'F83A22',
      'FA573C',
      'FF7537',
      'FFAD46',
      '42D692',
      '16A765',
      '7BD148',
      'B3DC6C',
      'FBE983',
      'FAD165',
      '92E1C0',
      '9FE1E7',
      '9FC6E7',
      '4986E7',
      '9A9CFF',
      'B99AFF',
      'C2C2C2',
      'CABDBF',
      'CCA6AC',
      'F691B2',
      'CD74E6',
      'A47AE2'
      */
             'ef857d',
             'ea5550',
             'ea5550',
             'ea5549',
             'ea553a',
             'ea5532',
             'ed6d35',
             'ed6d46',
             'bd6856',
             '98605e',
             '6b3f31',
             '6c3524',
             '6a1917',
             '622d18',
             '7b5544',
             '8f6552',
             'bb5535',
             'e6bfb2',
             'e8d3ca',
             'f3a68c',
             'e29676',
             'e6bfab',
             'fbdac8',
             'fdede4',
             'fce4d6',
             'e17b34',
             'bc611e',
             'f6b483',
             'be8f68',
             'bf783e',
             'e9dacb',
             'fbd8b5',
             '946c45',
             'ee7800',
             'f7b977',
             'c2894b',
             'ac6b25',
             'e8c59c',
             'c49a6a',
             '6f5436',
             '866629',
             'fad09e',
             'f6ae54',
             'f3981d',
             'f39800',
             'f6e5cc',
             'eae1cf',
             'ba8b40',
             'c5a05a',
             'caac71',
             'fac559',
             'e5a323',
             'c4972f',
             'f2d58a',
             'eedcb3',
             'ead7a4',
             'ffe9a9',
             'ffedab',
             'fff3b8',
             'fdd35c',
             'e9bc00',
             'fcc800',
             'e3d7a3',
             'ece093',
             'edde7b',
             'c1ab05',
             '72640c',
             '665a1a',
             'ffdc00',
             'ffdc00',
             'eddc44',
             'fff799',
             'fff462',
             'fff462',
             'fff352',
             'e0de94',
             'e3e548',
             'eaeea2',
             'e6eb94',
             'd9e367',
             'd1de4c',
             '5f6527',
             '777e41',
             '7b8d42',
             '9cbb1c',
             '9fc24d',
             'f0f6da',
             'dbebc4',
             '618e34',
             '65ab31',
             'a7d28d',
             '578a3d',
             '417038',
             '387d39',
             'bee0c2',
             '79c06e',
             '89c997',
             '37a34a',
             '009944',
             'bee0ce',
             'a4d5bd',
             '004d25',
             '3cb37a',
             '00984f',
             '009854',
             '00a960',
             '00a968',
             '288c66',
             '00885a',
             '006948',
             '005c42',
             '00533f',
             '54917f',
             'a5c9c1',
             'a3d6cc',
             '00947a',
             '00ac97',
             '00ac9a',
             '00a497',
             '2cb4ad',
             '418b89',
             '3c7170',
             '006a6c',
             '88bfbf',
             '67b5b7',
             '009e9f',
             '009b9f',
             '00a3a7',
             '25b7c0',
             '00afcc',
             '82cddd',
             'a1d8e2',
             'a1d8e6',
             '008db7',
             '007199',
             '006888',
             '00608d',
             '0073a8',
             'bbe2f1',
             'a0d8ef',
             '719bad',
             '00a1e9',
             '409ecc',
             '68a9cf',
             '88b5d3',
             'a4c1d7',
             'bbdbf3',
             '006eb0',
             '0068b7',
             '0068b7',
             '0075c2',
             '0075c2',
             '4496d3',
             '68a4d9',
             'bcc7d7',
             'bccddb',
             'b2cbe4',
             'a2c2e6',
             'a3b9e0',
             '94adda',
             '7a99cf',
             '6c9bd2',
             '001e43',
             '202f55',
             '192f60',
             '192f60',
             '043c78',
             '003f8e',
             '26499d',
             '4753a2',
             '434da2',
             '8d93c8',
             'a4a8d4',
             '4d4398',
             '5a4498',
             '9079b6',
             '47266e',
             '56256e',
             '915da3',
             'c7a5cc',
             'd1bada',
             'cab8d9',
             'b79fcb',
             'a688bd',
             '9b72b0',
             '7f1184',
             '6b395f',
             '6c2463',
             '841a75',
             '9a0d7c',
             'a50082',
             'af0082',
             '9f166a',
             'd9aacd',
             'e0b5d3',
             'e6afcf',
             'da81b2',
             'd04f97',
             'e4007f',
             'e62f8b',
             'c70067',
             '941f57',
             'd83473',
             'dc6b9a',
             'de82a7',
             'e3adc1',
             'debecc',
             'e5c1cd',
             'eb6ea0',
             'e95388',
             'ea618e',
             'b0778c',
             '6e4a55',
             'b33e5c',
             '942343',
             'c82c55',
             'e73562',
             'e73562',
             'd70035',
             'e8383d',
             '6c2735',
             '6c272d',
             'da536e',
             'e95464',
             'f19ca7',
             'f5b2b2',
             'f5b2ac',
             'e29399',
             'e3acae',
             'e6c0c0',
             'ffffff',
             'fafdff',
             'fef9fb',
             'fffff9',
             'fff9f5',
             'f7f6fb',
             'f7f6f5',
             'f8f4e6',
             'f5ecf4',
             'efefef',
             'e8ece9',
             'eeeaec',
             'eee9e6',
             'eee7e0',
             'ede4e1',
             'e6eae6',
             'eae8e1',
             'd3d6dd',
             'd4d9df',
             'd4d9dc',
             'd4dcd3',
             'dcd6d2',
             'd3d3d8',
             'd4d9d6',
             'cbd0d3',
             'bcbace',
             'c9caca',
             'c9c9c4',
             'c9c9c2',
             'c0c5c2',
             'bfbec5',
             '8da0b6',
             'b4aeb1',
             'b5b5ae',
             'abb1b5',
             'b4ada9',
             'afafb0',
             'aaaab0',
             'abb1ad',
             '9fa09e',
             '9d8e87',
             '9f9f98',
             '898989',
             '898880',
             '7e837f',
             '7d7b83',
             '7d7d7d',
             '736d71',
             '666c67',
             '626063',
             '594e52',
             '4e454a',
             '504946',
             '24140e',
             '000000',

    ],

    // Animation delay for the dialog
    delay: 0
  };

})(jQuery);
$(document).ready(function () {
  $('#pic').colorpicker({
    delay: 500
  }).on('changeColor', function (event) {
    $('#pic').css('background-color', event.color);
    pencolor = event.color;
  });
});