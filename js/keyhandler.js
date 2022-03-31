const keyboard = (() => {
    document.body.addEventListener('keydown', keyHandler);
    document.body.addEventListener('keyup', keyHandler);
    
    const keyboardState = {
        right: false,
        left: false,
        leftGun: false,
        rightGun: false,
        shoot: false,
        any: false,
       
    };

    function keyHandler(e) {
        const state = (e.type === 'keydown')
        if (e.keyCode == 39) {
            keyboardState.right = state;
        } else if (e.keyCode == 37) {
            keyboardState.left = state;
        } else if (e.keyCode == 65) {
            keyboardState.leftGun = state;
        } else if (e.keyCode == 68) {
            keyboardState.rightGun = state;
        } else if (e.keyCode == 32) {
            keyboardState.shoot = state;
        }


        if(state) { keyboardState.any = true }
        e.preventDefault();
    }
    return keyboardState;
    })();
