import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNewsDispatch, useNewsState } from '../../context/news/context';
import { fetchArticleById } from '../../context/news/actions';
import { Dialog } from '@headlessui/react'; 

const NewsDetail: React.FC = () => {
  const newsState = useNewsState();
  const newsDispatch = useNewsDispatch();
  const { articleId } = useParams<{ articleId?: string }>() || {};

  useEffect(() => {
    if (articleId) {
      fetchArticleById(newsDispatch, parseInt(articleId));
    }
  }, [articleId, newsDispatch]);

  const { selectedArticle } = newsState;

  // Create a state to manage the modal open/close state
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedArticle) {
    return <div>No article selected or not found.</div>;
  }

  return (
    <div>
      <h2>{selectedArticle.title}</h2>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              Article Content
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{selectedArticle.content}</p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default NewsDetail;
