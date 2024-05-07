import React from 'react';

function NoticeItem({ notice }) {
  return (
    <div className="p-4 mb-2 bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <h5 className="text-lg font-bold">{notice.title}</h5>
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-md">
          <a href={`/notice/${notice.id}`} className="text-white">
            View Detail
          </a>
        </button>
      </div>
      <p className="mt-2">{notice.content}</p>
    </div>
  );
}

export default NoticeItem;
