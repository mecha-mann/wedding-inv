(function(){
  var body=document.body, gate=document.getElementById('gate');
  var music=document.getElementById('wedding-music'), musicToggle=document.getElementById('music-toggle');
  function playMusic(){
    var playback=music.play();
    if(playback){playback.catch(function(error){
      if(error.name!=='NotAllowedError'){
        musicToggle.setAttribute('aria-pressed','false');
        musicToggle.setAttribute('aria-label','Turn music on');
        console.error('Wedding music could not be played:',error);
      }
    });}
  }
  musicToggle.addEventListener('click',function(){
    if(music.paused){
      musicToggle.setAttribute('aria-pressed','true');
      musicToggle.setAttribute('aria-label','Turn music off');
      playMusic();
    }else{
      music.pause();
      musicToggle.setAttribute('aria-pressed','false');
      musicToggle.setAttribute('aria-label','Turn music on');
    }
  });
  playMusic();
  document.getElementById('seal').addEventListener('click',function(){
    playMusic();
    gate.classList.add('open');
    setTimeout(function(){body.classList.remove('locked');body.classList.add('revealed');},700);
    setTimeout(function(){gate.style.display='none';},2200);
  });
  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.25});
  document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%3)*.12+'s';io.observe(el);});
  var scrollHint=document.querySelector('.scroll-hint');
  // scroll-linked
  var thread=document.getElementById('thread'),when=document.getElementById('when'),ticking=false;
  function update(){
    var h=document.documentElement.scrollHeight-innerHeight, y=scrollY;
    thread.style.transform='scaleX('+(h>0?y/h:0)+')';
    var r=when.getBoundingClientRect(), span=when.offsetHeight-innerHeight;
    var p=Math.min(1,Math.max(0,-r.top/span*1.25));
    when.style.setProperty('--p',p.toFixed(3));
    scrollHint.classList.toggle('is-visible',r.top<innerHeight&&r.bottom>innerHeight*.35);
    ticking=false;
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',update);update();
})();
