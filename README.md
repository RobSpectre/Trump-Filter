PokeGone - Gotta block 'em all!
================================
A Chrome extension that removes Pokemon from the Internet.


Overview
--------------------------

All of a sudden, a new mobile app called Pokemon Go got extremely popular ([read about it on the Wall Street Journal](http://www.wsj.com/articles/pokemon-chasing-investors-send-nintendo-shares-soaring-1468228206)!). Because of this, the internet is full of people talking about all things Pokemon - which can be a little annoying.

PokeGone removes Pokemon Go references from the internet so you can get to normal watching funny cat GIFs.


Features
--------------------------

* Detects instances of Pokemon GO on web pages.
* Attempts to identify semantically sections of the page likely to contain Pokemon Go reference and removes them from the page.
* Sensitivity settings to customize the aggressiveness of the filter - remove single references, chunks or the entire page.


Installation (for Users)
--------------------------

Just install the extension from [the Chrome Web
Store](https://chrome.google.com/webstore/detail/jionadcjdpdikjmgfohlohnclocfaija)!

Then surf the web as normal without worrying about bumping in to adults going mad about Pokemon.


Installation (for Developers)
-------------------------

Firstly, special thanks to Rob Spectre who made the [Trump Filter](https://github.com/RobSpectre/Trump-Filter)! Open Source (which this extension is completely based off).

Want to hack on PokeGone?  Sweet!

Here's a how to to get the source of the Chrome Extension running in your environment.

1) Grab latest source
<pre>
git clone https://github.com/JamieFarrelly/PokeGone
</pre>

2) Enable Chrome Extension in your Chrome install
<pre>
Open Chrome.
Navigate to Settings... Tools... Extensions.
Click + on "Developer mode"
Click "Load unpacked extensions..."
Navigate to directory you installed PokeGone and click Open.
Chuckle to self as you reload this page and significant chunks of it suddenly disappear.
</pre>

3) Make the world a safer place.


Meta
-------------------------

* Special thanks to [Rob Spectre](http://brooklynhacker.com) since he done all of the hard work, I just hit find & replace.
* This work is licensed under GPLv3.
