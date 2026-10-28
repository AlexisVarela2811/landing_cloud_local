/* Hero ASCII silhouettes (ported from the design artboard). */
/* Dense animated ASCII silhouettes: cloud, folder, upload and local server. */
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var width = 190, height = 165, step = 3;
  var colors = ['#0d9488', '#14b8a6', '#5c6674', '#d97706'];
  var tiles = [];
  function shape(ctx, kind) {
    ctx.fillStyle = '#000'; ctx.strokeStyle = '#000'; ctx.lineJoin = 'round';
    if (kind === 0) {
      ctx.beginPath(); ctx.moveTo(52,117); ctx.bezierCurveTo(18,116,20,76,45,72); ctx.bezierCurveTo(49,42,82,32,103,53); ctx.bezierCurveTo(124,44,145,59,146,78); ctx.bezierCurveTo(169,87,165,118,140,119); ctx.closePath(); ctx.fill();
      /* A small upload arrow cut into the cloud. */
      ctx.globalCompositeOperation='destination-out'; ctx.beginPath(); ctx.moveTo(95,69); ctx.lineTo(78,86); ctx.lineTo(86,86); ctx.lineTo(86,103); ctx.lineTo(104,103); ctx.lineTo(104,86); ctx.lineTo(112,86); ctx.closePath(); ctx.fill(); ctx.globalCompositeOperation='source-over';
    } else if (kind === 1) {
      ctx.beginPath(); ctx.moveTo(32,52); ctx.lineTo(75,52); ctx.lineTo(87,64); ctx.lineTo(158,64); ctx.lineTo(151,119); ctx.lineTo(38,119); ctx.closePath(); ctx.fill();
      ctx.clearRect(43,76,104,3);
    } else if (kind === 2) {
      ctx.beginPath(); ctx.moveTo(95,36); ctx.lineTo(132,75); ctx.lineTo(113,75); ctx.lineTo(113,111); ctx.lineTo(77,111); ctx.lineTo(77,75); ctx.lineTo(58,75); ctx.closePath(); ctx.fill(); ctx.fillRect(48,119,94,8);
    } else {
      /* A local storage tower with three bays and status lights. */
      ctx.beginPath(); ctx.roundRect(48,28,94,112,9); ctx.fill();
      for (var y=41; y<=105; y+=32) {
        ctx.clearRect(56,y,78,25);
        ctx.fillRect(60,y+4,70,17);
        ctx.clearRect(66,y+8,37,2); ctx.clearRect(66,y+13,25,2);
        ctx.clearRect(117,y+7,6,6);
      }
      ctx.fillRect(61,143,22,3); ctx.fillRect(107,143,22,3);
    }
  }
  function points(kind) {
    var mask=document.createElement('canvas'); mask.width=width; mask.height=height;
    var ctx=mask.getContext('2d'); ctx.translate(95,82); ctx.scale(1.1,1.1); ctx.translate(-95,-82); shape(ctx,kind);
    var pixels=ctx.getImageData(0,0,width,height).data, result=[];
    function filled(x,y) { return x>=0 && y>=0 && x<width && y<height && pixels[(y*width+x)*4+3]>128; }
    for(var y=0;y<height;y+=step) for(var x=0;x<width;x+=step) {
      if(filled(x,y)) {
        var edge = !filled(x-step,y) || !filled(x+step,y) || !filled(x,y-step) || !filled(x,y+step);
        var shadow = kind === 0 ? x+y*.55>145 : x>110;
        var pattern = (Math.floor(x/step)*7+Math.floor(y/step)*11)%17;
        result.push({x:x,y:y,phase:(x*.071+y*.053+kind)*1.7,
          color:edge || shadow ? 0 : 1,
          glyph:edge ? '+' : (pattern<2 ? ':' : pattern<4 ? '.' : pattern<6 ? '*' : '+'),
          strength:edge ? 1 : (shadow ? .9 : .72)});
      }
    }
    return result;
  }
  document.querySelectorAll('.dot-tile').forEach(function(el,index) {
    var canvas=document.createElement('canvas'); canvas.width=width*2; canvas.height=height*2;
    el.appendChild(canvas); var ctx=canvas.getContext('2d'); ctx.scale(2,2);
    tiles.push({ctx:ctx, points:points(index === 0 ? 0 : 3), index:index});
  });
  var start=performance.now(), frame=0;
  function draw(now) {
    var still=reduced.matches, t=still ? 0 : (now-start)/1000;
    tiles.forEach(function(tile) {
      var ctx=tile.ctx; ctx.clearRect(0,0,width,height);
      ctx.font='3.8px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
      tile.points.forEach(function(p) {
        var reveal=still ? 1 : Math.max(0,Math.min(1,(t-(p.y/height*.9+p.x/width*.35))/.65));
        var wave=still ? 0 : Math.sin(t*1.8+p.phase);
        ctx.globalAlpha=reveal*p.strength*(still ? 1 : .82 + .18*(.5+.5*wave));
        ctx.fillStyle=document.documentElement.dataset.theme === 'dark' ? (p.color === 0 ? '#5eead4' : '#14b8a6') : colors[p.color];
        var drift=still ? 0 : (1-reveal)*10;
        ctx.fillText(p.glyph,p.x+wave*.8+Math.sin(p.phase)*drift,p.y+wave*.6+Math.cos(p.phase)*drift);
      });
      ctx.globalAlpha=1;
    });
    if (!still && !document.hidden) frame=requestAnimationFrame(draw);
  }
  function restart() { cancelAnimationFrame(frame); draw(performance.now()); }
  reduced.addEventListener('change', restart);
  new MutationObserver(restart).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  document.addEventListener('visibilitychange', function() { if (!document.hidden) restart(); else cancelAnimationFrame(frame); });
  restart();
})();
