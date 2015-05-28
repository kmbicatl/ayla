Thank you for choosing SmartAdmin WebApp!

**********************

Please note: In order to view the webApp you must load the "build folder" contents to a web server - as these pages are built with ajax controls. You will not be able to see the page rendering through local. 

Documentation is coming soon, thank you for your patience... 

**********************

Follow @bootstraphunt to keep upto date on all updates.

You can also visit our bug tracker - make sure to bookmark (http://bootstraphunter.com/smartadmin/BUGTRACK/track_/)


**********************

###Update 1.2 (13/1/2014)

- Added non-ajax version for SmartAdmin
- Updated jarvis.widget to work with non-ajax page view (Jarvis widget now includes onSave and OnLoad hooks to be saved into the database) 
- app.js has been significantly reworked - users can switch on / off plugins and features more easily
- LESS files are now more modular, new variables are added for better control
- Update Select2 to latest version (3.4.5)
- All ajaxed pages now scroll to top when loading a new page
- Nav menu clicks now updates title
- Added new custom plugin "SmartClick" - this will counter the 300ms delay click in iDevices (this is turned off by default - see app.js to turn it on)
- Fixed CSS issue with X-editable date popup
- Fixed Android mobile menu bug
- Typo in main.less file that resulted certain @media width content to not adjust properly on iPad view
- Function for drawing breadcrumb was running for all ajax calls - this now checks the container and runs the function when appropriate
- Removed CSS3 wobble animation from menu items to save memory on touch devices
- Removed animation from menu slide in / out to save mobile memory
- Added the 3 missing images to the image library (also deleted reference to images in CSS that were not being used) 

###Update 1.1 (1/1/2014)

- SmartAdmin theme is now *built with LESS* - previous CSS files are deprecated!
- *Added 2 new Skins* - Dark Elegance and Ultra White (see the settings panel - cog icon top right corner )
- Fixed minor bugs:
-- Improved repainting for touch devices 
-- Fixed ajax bug
-- Fixed all IE 9 related issues
-- Ajax scripts now load faster

###Update 1.0 (23/12/2013)

- Initial release