/**
 * Created by Danial Vafadar on 7/31/15.
 */
Object.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
            if( this[ prop ] === value )
                return prop;
        }
    }
};