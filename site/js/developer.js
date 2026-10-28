// OMER DESIGN — public GitHub integration, no credentials or private API calls.
const account = 'omernkf';
const reposEl = document.getElementById('github-repos');
const statusEl = document.getElementById('github-status');
const commitsEl = document.getElementById('recent-commits');
const repoFallback = reposEl.innerHTML;
const commitFallback = commitsEl.innerHTML;
const api = 'https://api.github.com';
function node(tag, text, cls) { const el = document.createElement(tag); if (text != null) el.textContent = text; if (cls) el.className = cls; return el; }
function safeGithubUrl(url) { try { const u = new URL(url); return u.protocol === 'https:' && u.hostname === 'github.com' ? u.href : null; } catch { return null; } }
async function github(path) {
  const response = await fetch(`${api}${path}`, { headers: {Accept:'application/vnd.github+json'}, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
  return response.json();
}
async function showRepos() {
 try {
  const data = await github(`/users/${account}/repos?type=public&sort=updated&per_page=12`);
  if (!Array.isArray(data)) throw new Error('Invalid response');
  const visible = data.filter(r=>!r.private && !r.fork && safeGithubUrl(r.html_url));
  if (!visible.length) { statusEl.textContent='لا توجد مستودعات أصلية عامة معروضة حاليًا.'; return; }
  reposEl.replaceChildren();
  for(const r of visible){
   const card=node('article',null,'dev-card');
   card.append(node('span',r.language || 'Repository','dev-label'),node('h3',r.name),node('p',r.description||'مستودع عام على GitHub.'));
   const details = node('span',`★ ${Number(r.stargazers_count)||0} · تحديث ${new Date(r.updated_at).toLocaleDateString('ar')}`,'dev-meta');card.append(details);
   const link=node('a','استكشف الكود ↗');link.href=r.html_url;link.target='_blank';link.rel='noopener noreferrer';card.append(link);reposEl.append(card);
  }
  statusEl.textContent=`تم تحميل ${visible.length} مستودعًا عامًا من GitHub.`;
 }catch(e){ reposEl.innerHTML=repoFallback;statusEl.textContent='تعذر تحديث قائمة GitHub الآن، ويمكنك استخدام روابط المستودعات الثابتة.'; }
}
async function showCommits(){
 try{
  const commits=await github('/repos/omernkf/nkf-yemen/commits?per_page=5');
  if(!Array.isArray(commits)||!commits.length) return;
  commitsEl.replaceChildren();
  for(const item of commits){
   const linkUrl=safeGithubUrl(item.html_url);if(!linkUrl) continue;
   const li=node('li');const a=node('a',String(item.commit?.message||'تحديث').split('\n')[0].slice(0,150));a.href=linkUrl;a.target='_blank';a.rel='noopener noreferrer';li.append(a);
   const stamp=item.commit?.author?.date;if(stamp && !Number.isNaN(Date.parse(stamp))) li.append(node('time',new Date(stamp).toLocaleDateString('ar')));
   commitsEl.append(li);
  }
 }catch(e){commitsEl.innerHTML=commitFallback;}
}
showRepos();showCommits();

// Public metadata registry maintained in the development-hub GitHub repository.
async function showProjectRegistry() {
 const el=document.getElementById('hub-projects'); const status=document.getElementById('hub-projects-status');
 if(!el || !status) return;
 try {
  const resp=await fetch('https://raw.githubusercontent.com/omernkf/development-hub/main/projects/projects.json',{signal:AbortSignal.timeout(8000),cache:'no-store'});
  if(!resp.ok) throw new Error('Registry unavailable');
  const data=await resp.json(); if(!Array.isArray(data.projects)) throw new Error('Invalid registry');
  el.replaceChildren();
  for(const p of data.projects){
   if(!p || !p.name)continue;
   const card=node('article',null,'dev-card');
   card.append(node('span',String(p.type||'Project').slice(0,50),'dev-label'),node('h3',String(p.name).slice(0,120)),node('p',String(p.description||'مشروع تطوير').slice(0,300)));
   for(const [address,label] of [[p.website,'معاينة الموقع ↗'],[p.repository,'المصدر العام ↗']]){
    if(!address)continue;try{const u=new URL(address);if(u.protocol!=='https:')continue; if(label.includes('المصدر')&&u.hostname!=='github.com')continue; const a=node('a',label);a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';card.append(a)}catch{}
   }
   el.append(card);
  }
  status.textContent=`تمت مزامنة ${el.children.length} مشاريع من فهرس Development Hub العام.`;
 }catch(e){ status.textContent='تعذرت مزامنة فهرس المشاريع الآن؛ الروابط الثابتة لا تزال متاحة.'; }
}
showProjectRegistry();
