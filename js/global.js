/* global.js — WanderWise | Firebase Firestore + Auth edition */

import { initializeApp }          from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc,
         addDoc, setDoc, deleteDoc, doc, query, orderBy }
  from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyBAwzjO9ihz3kc7cPeCHtZoNHWZl_-3zcw",
  authDomain:        "wanderwise-c7736.firebaseapp.com",
  projectId:         "wanderwise-c7736",
  storageBucket:     "wanderwise-c7736.firebasestorage.app",
  messagingSenderId: "650952539827",
  appId:             "1:650952539827:web:a321c7476315aa88947ac6"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('raised', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function () {
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  if (!burger || !drawer) return;
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
    burger.querySelectorAll('span')[1].style.opacity   = open ? '0' : '';
    burger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
  });
  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    })
  );
})();

(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === 'index.html' && href === './') || href.endsWith(page))
      a.classList.add('active');
  });
})();

var WW = window.WW = window.WanderWise = {};
WW.db   = db;
WW.auth = auth;
WW.login  = (email, password) => signInWithEmailAndPassword(auth, email, password);
WW.logout = () => signOut(auth);
WW.onAuth = (cb) => onAuthStateChanged(auth, cb);

WW.formatDate = iso =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

WW.excerpt = (html, maxLen) => {
  const d = document.createElement('div');
  d.innerHTML = html;
  const t = d.textContent || '';
  return t.length > maxLen ? t.slice(0, maxLen).trimEnd() + '\u2026' : t;
};

WW.getPosts = async (category) => {
  try {
    const q    = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    let posts  = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (category && category !== 'all') posts = posts.filter(p => p.category === category);
    return posts;
  } catch (e) { console.error('getPosts:', e); return []; }
};

WW.getPost = async (id) => {
  try {
    const snap = await getDoc(doc(db, 'posts', id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (e) { console.error('getPost:', e); return null; }
};

WW.savePost = async (post) => {
  try {
    if (post.id) {
      await setDoc(doc(db, 'posts', post.id), post, { merge: true });
      return post;
    } else {
      post.date = new Date().toISOString();
      const ref = await addDoc(collection(db, 'posts'), post);
      return { ...post, id: ref.id };
    }
  } catch (e) { console.error('savePost:', e); throw e; }
};

WW.deletePost = async (id) => {
  try { await deleteDoc(doc(db, 'posts', id)); }
  catch (e) { console.error('deletePost:', e); throw e; }
};

WW.seedIfEmpty = async () => {
  try {
    const posts = await WW.getPosts();
    if (posts.length > 0) return;
    const demos = [
      { title: "10 Days in Tuscany: A Road-tripper's Honest Guide", category: 'europe', excerpt: 'Winding roads, village markets, and the kind of silence you only find between cypress trees.', content: '<p>Tuscany rewards the unhurried traveller. We drove a rented Fiat Panda for ten days, stopping whenever the light looked interesting. Here is what we actually learned — not the guidebook version.</p><p>The best thing we did was skip Florence for the first three days entirely. Instead we based ourselves in Montalcino, a hilltop town that empties out after 7pm and feels entirely local once the day-trippers leave.</p>', image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=900&q=80', date: new Date(Date.now() - 4 * 86400000).toISOString() },
      { title: 'The American Southwest: What Nobody Warns You About', category: 'usa', excerpt: 'The Grand Canyon crowds, the Joshua Tree solitude, and the highway towns that are secretly the best part.', content: '<p>Everyone talks about the landscapes. Nobody talks about the logistics. Here is the honest version of a three-week Southwest road trip.</p><p>Zion National Park in October is extraordinary and manageable. July is neither. The shuttle system in summer is efficient but the trail heat is genuinely dangerous.</p>', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80', date: new Date(Date.now() - 9 * 86400000).toISOString() },
      { title: 'Porto in 48 Hours: The Essential List', category: 'europe', excerpt: "Azulejo tiles, old bookshops, and the best custard tarts you'll eat this decade.", content: '<p>Porto is compact enough to walk almost everywhere, and the hills mean you are always arriving at something from an interesting angle.</p><p>Morning of day one: Livraria Lello before 10am. Then walk down to the river through the Bairro da Se.</p>', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80', date: new Date(Date.now() - 15 * 86400000).toISOString() }
    ];
    for (const demo of demos) await addDoc(collection(db, 'posts'), demo);
  } catch (e) { console.error('seedIfEmpty:', e); }
};

WW.renderCard = (post) => {
  const img      = post.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80';
  const cat      = post.category === 'usa' ? 'USA Travel' : post.category === 'europe' ? 'Europe Travel' : 'Travel Tips';
  const catClass = post.category === 'usa' ? 'cat-usa' : post.category === 'europe' ? 'cat-europe' : '';
  const excerpt  = post.excerpt || WW.excerpt(post.content, 120);
  const date     = WW.formatDate(post.date);
  const href     = location.pathname.includes('/pages/') ? 'post.html?id=' + post.id : 'pages/post.html?id=' + post.id;
  return '<a class="post-card" href="' + href + '"><div class="post-card-wrap"><img class="post-card-img" src="' + img + '" alt="' + post.title + '" loading="lazy"></div><div class="post-card-meta"><span class="post-card-cat ' + catClass + '">' + cat + '</span><span>\u00b7</span><span>' + date + '</span></div><h3>' + post.title + '</h3><p>' + excerpt + '</p></a>';
};
