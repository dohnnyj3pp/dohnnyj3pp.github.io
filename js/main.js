// main.js — persistent video, soft navigation, and hero motion

document.addEventListener("DOMContentLoaded",()=>{
  const body=document.body;
  const video=document.getElementById("intro-video");
  const yearSpan=document.getElementById("year");

  let pageContent=document.getElementById("page-content");
  let activeRequest;
  let heroStarted=false;
  let heroTimers=[];
  let parallaxFrame;

  if(yearSpan) yearSpan.textContent=new Date().getFullYear();
  if(video) video.play().catch(()=>{});

  function revealContent(content){
    if(!content)return;

    content.classList.add("is-entering");

    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        content.classList.remove("is-entering");
      });
    });
  }

  function resetHeroState(){
    heroTimers.forEach(clearTimeout);
    heroTimers=[];

    body.classList.remove(
      "hero-ready",
      "title-ready",
      "text-ready",
      "buttons-ready",
      "cursor-visible"
    );

    document.querySelector(".hero-content")
      ?.classList.remove("hero-enter");

    heroStarted=false;
  }

  function setActiveNav(url){
    const filename=url.pathname.split("/").pop()||"index.html";

    document.querySelectorAll(".nav-links a").forEach(link=>{
      link.classList.toggle(
        "active",
        link.getAttribute("href")===filename
      );
    });
  }

function setPageMode(nextBody) {
  body.classList.toggle(
    "hero-page",
    nextBody.classList.contains("hero-page")
  );

  body.classList.toggle(
    "subpage",
    nextBody.classList.contains("subpage")
  );
}

  body.classList.add(
    "page-loaded",
    "custom-cursor-enabled"
  );

  if(body.classList.contains("nav-ready")){
    body.classList.add("nav-ready");
  }
}

  function enterHero(){
    document.querySelector(".hero-content")
      ?.classList.add("hero-enter");
  }

  function startHeroSequence(){
    if(!body.classList.contains("hero-page")||heroStarted)return;

    heroStarted=true;

    const run=()=>{
      heroTimers=[
        setTimeout(()=>body.classList.add("nav-ready"),700),
        setTimeout(()=>body.classList.add("hero-ready"),900),
        setTimeout(()=>enterHero(),1300),
        setTimeout(()=>body.classList.add("title-ready"),1700),
        setTimeout(()=>body.classList.add("text-ready"),2300),
        setTimeout(()=>body.classList.add("buttons-ready"),3000),
        setTimeout(()=>body.classList.add("cursor-visible"),3800)
      ];
    };

    if(!video||video.readyState>=2){
      run();
    }else{
      video.addEventListener("loadeddata",run,{once:true});
    }
  }

  async function loadPage(url,{pushState=false}={}){
    if(activeRequest) activeRequest.abort();

    const controller=new AbortController();
    activeRequest=controller;

    body.classList.add("transitioning");

    try{
      const response=await fetch(url.href,{
        signal:controller.signal
      });

      if(!response.ok){
        throw new Error(`Could not load ${url.pathname}`);
      }

      const html=await response.text();

      if(activeRequest!==controller)return;

      const nextDocument=new DOMParser()
        .parseFromString(html,"text/html");

      const nextContent=nextDocument.getElementById("page-content");

      if(!nextContent){
        throw new Error("Missing page-content");
      }

      setPageMode(nextDocument.body);

      nextContent.classList.add("is-entering");

      pageContent.replaceWith(nextContent);
      pageContent=nextContent;

      document.title=nextDocument.title;

      setActiveNav(url);

      if(pushState){
        history.pushState({},"",url.href);
      }

      requestAnimationFrame(()=>{
        body.classList.remove("transitioning");

        requestAnimationFrame(()=>{
          nextContent.classList.remove("is-entering");
        });
      });

      startHeroSequence();

    }catch(error){
      if(error.name!=="AbortError"){
        window.location.assign(url.href);
      }
    }finally{
      if(activeRequest===controller){
        activeRequest=undefined;
      }
    }
  }

  document.addEventListener("click",event=>{
    const link=event.target.closest("a[href]");

    if(
      !link||
      event.defaultPrevented||
      event.button!==0||
      event.metaKey||
      event.ctrlKey||
      event.shiftKey||
      event.altKey||
      link.target||
      link.hasAttribute("download")
    )return;

    const url=new URL(link.href,window.location.href);

    const isSitePage=
      url.origin===window.location.origin &&
      (
        url.pathname.endsWith(".html")||
        url.pathname.endsWith("/")
      );

    if(!isSitePage||url.hash||url.href===window.location.href)return;

    event.preventDefault();

    loadPage(url,{pushState:true});
  });

  window.addEventListener("popstate",()=>{
    loadPage(new URL(window.location.href));
  });

  document.addEventListener("pointermove",event=>{
    if(!window.matchMedia("(pointer:fine)").matches)return;

    const offsetX=(event.clientX/window.innerWidth-.5)*-6;
    const offsetY=(event.clientY/window.innerHeight-.5)*-6;

    cancelAnimationFrame(parallaxFrame);

    parallaxFrame=requestAnimationFrame(()=>{
      const heroInner=document.querySelector(".hero-content-inner");

      if(heroInner){
        heroInner.style.transform=
          `translate3d(${offsetX}px,${offsetY}px,20px)`;
      }
    });
  });

  body.classList.add("page-loaded");

  revealContent(pageContent);
  startHeroSequence();
});