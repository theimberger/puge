if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/puge/sw.js', { scope: '/puge/' })})}