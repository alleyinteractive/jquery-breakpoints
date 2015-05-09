( $ ) {

	$.fn.breakpoints = function( args ) {

		// Initialize defaults and settings
		var defaults = {
			breakpoints : {
				'desktop' : -1
			}
		},
		settings = $.extend( true, {}, defaults, args ),
		currentBreakpoint;

		// Sort the breakpoints array
		settings.breakpoints = $.map( settings.breakpoints, function( breakpointWidth, breakpointID ){
			return { breakpointID, breakpointWidth };
		} ).sort( function( a, b ) {
			return a.breakpointWidth - b.breakpointWidth;
		} );

		// Initial breakpoint on document ready
		$( document ).ready( function() {
			getBreakpoint();
		} );
		
		// Check breakpoint on window resize
		$( window ).resize( function() {
			getBreakpoint();
		} );

		// Checks the breakpoints and dispatches events
		function getBreakpoint() {
			var floatingBreakpoint = {
				'breakpointID': 'desktop',
				'breakpointWidth': settings.breakpoints[0].breakpointWidth
			};

			// Compare sorted breakpoint list
			$.each( settings.breakpoints, function( index, breakpoint ) {
				var width = $( window ).width();

				// Break on first breakpoint larger than window width
				if ( breakpoint.breakpointWidth >= width ) {
					floatingBreakpoint.breakpointWidth = breakpoint.breakpointWidth;
					floatingBreakpoint.breakpointID = breakpoint.breakpointID;
					return false;
				}
			} );

			// Check if the breakpoint has changed
			if ( currentBreakpoint === undefined || currentBreakpoint.breakpointWidth !== floatingBreakpoint.breakpointWidth ) {
				var activeBreakpointID = floatingBreakpoint.breakpointID,
				deactivatedBreakpointID = currentBreakpoint === undefined ? '' : currentBreakpoint.breakpointID;
				currentBreakpoint = floatingBreakpoint;

				// Dispatch breakpoint changed event
				$( window ).trigger( 'breakpointChange', { 'activeBreakpoint' : activeBreakpointID, 'deactivatedBreakpoint' : deactivatedBreakpointID } );
			}

		}
	}

} )( jQuery );
