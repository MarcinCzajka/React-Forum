export default function(callback) {
    const script = document.createElement('script');
    script.addEventListener('load', callback);
    script.async = true;
    script.defer = true;
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";

    document.getElementsByTagName('body')[0].appendChild(script);
}