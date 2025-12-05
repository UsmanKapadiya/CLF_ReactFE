import videoThumbnail from '../assets/videoThumbnail.png';

// Gallery Categories
export const GALLERY_CATEGORIES = ['photos', 'videos'];

// Gallery Videos Data
export const galleryVideos = [
    {
        id: 1,
        videoUrl: 'https://www.youtube.com/embed/W_Owf2Kybgw',
        thumbnail: videoThumbnail,
        title: 'Kung Fu Training Session 2024',
        description: 'Advanced training techniques'
    },
    {
        id: 2,
        videoUrl: 'https://www.youtube.com/embed/SBXGAmxwfx8',
        thumbnail: videoThumbnail,
        title: 'Competition Highlights 2024',
        description: 'Annual tournament highlights'
    },
    {
        id: 3,
        videoUrl: 'https://www.youtube.com/embed/rQXHoU0AUi8',
        thumbnail: videoThumbnail,
        title: 'Student Performance 2023',
        description: 'Student demonstration'
    },
    {
        id: 4,
        videoUrl: 'https://www.youtube.com/embed/kgLwSTRUqtg',
        thumbnail: videoThumbnail,
        title: 'Competition Highlights 2024',
        description: 'Annual tournament highlights'
    },
    {
        id: 5,
        videoUrl: 'https://www.youtube.com/embed/jnQVSE1jVI4',
        thumbnail: videoThumbnail,
        title: 'Student Performance 2023',
        description: 'Student demonstration'
    },
];

// Gallery Photos Data - Organized by Year
export const galleryPhotos = {
    '2025': [
        {
            title: '2025 Annual BBQ',
            subTitle: 'Richmond',
            catalogThumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_17_10-16-2025-438x246.jpg',
            photos: [
                { id: 1, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_01-400x246.jpg', alt: 'Training 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_01-400x246.jpg', title: 'Training Session' },
                { id: 2, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_02-400x246.jpg', alt: 'Competition 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_02-400x246.jpg', title: 'Competition Event' },
                { id: 3, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', alt: 'Special Event 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', title: 'Special Event' },
                { id: 4, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', alt: 'Event 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', title: 'Special Event' },
                { id: 5, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_01_10-16-2025-438x246.jpg', alt: 'Training 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_01_10-16-2025-438x246.jpg', title: 'Training Session' },
                { id: 6, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_03_10-16-2025-438x246.jpg', alt: 'Competition 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_03_10-16-2025-438x246.jpg', title: 'Competition Event' },
                { id: 7, src: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', alt: 'Event 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/rbbq_07-400x246.jpg', title: 'Special Event' },
                { id: 8, src: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', alt: 'Special Event 2025', thumbnail: 'https://clfcanada.com/wp-content/uploads/2025/10/CLF_05_10-16-2025-438x246.jpg', title: 'Special Event' },
            ]
        },
        {
            title: '2025 Lion Dance',
            subTitle: 'Crystal Mall',
            catalogThumbnail: 'https://clfcanada.com/wp-content/uploads/2014/05/crystalm_17-400x246.jpg',
            photos: [
                { id: 9, src: '/images/2025/lion1.jpg', alt: 'Lion Dance 2025', thumbnail: '/images/2025/lion1-thumb.jpg', title: 'Lion Dance Performance' },
                { id: 10, src: '/images/2025/lion2.jpg', alt: 'Lion Dance Event 2025', thumbnail: '/images/2025/lion2-thumb.jpg', title: 'Crystal Mall Event' },
                { id: 11, src: '/images/2025/lion3.jpg', alt: 'Traditional Performance 2025', thumbnail: '/images/2025/lion3-thumb.jpg', title: 'Traditional Performance' },
            ]
        }
    ],
    '2024': [
        {
            title: 'Gallery 2024',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2024/year-thumb.jpg',
            photos: [
                { id: 12, src: '/images/2024/photo1.jpg', alt: 'Training 2024', thumbnail: '/images/2024/thumb1.jpg', title: 'Training Session' },
                { id: 13, src: '/images/2024/photo2.jpg', alt: 'Competition 2024', thumbnail: '/images/2024/thumb2.jpg', title: 'Competition Event' },
                { id: 14, src: '/images/2024/photo3.jpg', alt: 'Event 2024', thumbnail: '/images/2024/thumb3.jpg', title: 'Special Event' },
                { id: 15, src: '/images/2024/photo4.jpg', alt: 'Tournament 2024', thumbnail: '/images/2024/thumb4.jpg', title: 'Tournament' },
            ]
        }
    ],
    '2023': [
        {
            title: 'Gallery 2023',
            subTitle: 'Annual Event',
            catalogThumbnail: '/images/2023/year-thumb.jpg',
            photos: [
                { id: 16, src: '/images/2023/photo1.jpg', alt: 'Training 2023', thumbnail: '/images/2023/thumb1.jpg', title: 'Training Session' },
                { id: 17, src: '/images/2023/photo2.jpg', alt: 'Competition 2023', thumbnail: '/images/2023/thumb2.jpg', title: 'Competition Event' },
                { id: 18, src: '/images/2023/photo3.jpg', alt: 'Event 2023', thumbnail: '/images/2023/thumb3.jpg', title: 'Special Event' },
            ]
        }
    ],
};
