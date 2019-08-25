window.onload = function(){
    
    let canvas = document.getElementsByClassName("canvas")[0];
    let context = canvas.getContext("2d");
    
    let dr = "e";
    let count = 0;
    let snake = [{x:3,y:0},{x:2,y:0},{x:1,y:0},{x:0,y:0}]    
    let aim = {y: Math.round(Math.random()*(canvas.height/7)), x: Math.round(Math.random()*(canvas.width/7))};

    
    const directionsPerKey = {37: "w", 38: "n", 39: "e", 40: "s"};
    const directionsSkip = {"w": "e", "e": "w", "n": "s", "s": "n"};
    
    
    const setDirection = (e) => {dr = (directionsSkip[directionsPerKey[e.keyCode]]==dr)?dr:directionsPerKey[e.keyCode]}
    
    
    const resetAim = () => {aim = {y: Math.round(Math.random()*(canvas.height)), x: Math.round(Math.random()*(canvas.width))};}
    
    const drawAim = (x,y) => {
        context.fillStyle = "white";
        context.fillRect(x*7,y*7,7,7);
    }
    
    drawAim(aim.x, aim.y);
    document.addEventListener("keydown", setDirection);
    
    
    const drawSquare = (x,y) => {
        context.fillStyle = "green";
        context.fillRect(x*7,y*7,7,7);
    }
    

    const drawSnake = () => {
        
        context.clearRect(0,0,canvas.width, canvas.height);
        
        snake.forEach(function(item){drawSquare(item.x, item.y);})
        drawAim(aim.x, aim.y);
        
        let sx = snake[0].x
        let sy = snake[0].y
        
        if(sx<0||sy<0||canvas.width/7<=sx||canvas.height/7<=sy) location.reload();
        
        snake.pop();
        
        sx = (dr=="w")? sx-1:(dr=="e")? sx+1:sx;
        sy = (dr=="n")? sy-1:(dr=="s")? sy+1:sy;
        
        if(sx==aim.x && sy==aim.y) resetAim();
        
        let newhead = {x:sx,y:sy};
        
        snake.unshift(newhead);
    }
    
    setInterval(drawSnake, 100);
};
