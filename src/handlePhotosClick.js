export default function handlePhotoClick(albumId, albums, setAlbums) {
    const albumIndex = albums.findIndex((album) => album.id === albumId);
    const album = albums[albumIndex];
    if (album.photosShown) {
        album.photosShown = false;
        setAlbums([...albums]);
    } else {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=10`)
            .then((response) => response.json())
            .then((data) => {
                album.photosShown = true;
                album.photos = data;
                setAlbums([...albums]);
            });
    }
}

