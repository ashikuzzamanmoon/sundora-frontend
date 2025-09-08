// components/common/AnnouncementBar.tsx
'use client';

import Marquee from 'react-fast-marquee';

const announcements = [
  {
    text: "We're thrilled by the response to our sale 🎉 You may notice slight delays, but we're ensuring a seamless shopping experience for you.",
  },
  {
    text: "We're thrilled by the response to our sale 🎉 You may notice slight delays, but we're ensuring a seamless shopping experience for you.",
  },
];

const AnnouncementBar = () => {
  return (
    <div className="bg-[#ebd9ac] text-gray-800">
      <Marquee speed={40} pauseOnHover={true}>
        {announcements.map((announcement, index) => (
          <p key={index} className="py-2 text-sm font-medium mx-24">
            {announcement.text}
          </p>
        ))}
      </Marquee>
    </div>
  );
};

export default AnnouncementBar;