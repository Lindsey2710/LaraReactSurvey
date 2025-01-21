import PropTypes from 'prop-types';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import TButton from './core/TButton';

export default function SurveyListItem({ survey, onDeleteClick }) {
  return (
    <div className="flex flex-col py-4 px-6 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 rounded-lg h-[470px]">
      <img
        src={survey.image_url}
        alt={survey.title}
        className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      />
      <h4 className="mt-4 text-lg font-bold text-gray-800">{survey.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survey.description }}
        className="overflow-hidden flex-1 text-gray-600"
      ></div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <TButton to={`/surveys/${survey.id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200">
            <PencilIcon className="w-5 h-5 mr-2" />
            Edit
          </TButton>
          <TButton to={`/surveys/${survey.id}/answers`} link>
            <EyeIcon className="w-5 h-5 mr-2" />
            View Answers
          </TButton>
        </div>
        <div className="flex items-center gap-1">
          <TButton href={`/survey/public/${survey.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>

          {survey.id && (
            <TButton onClick={ev => onDeleteClick(survey.id)} circle link color="red">
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  );
}

SurveyListItem.propTypes = {
  survey: PropTypes.object.isRequired,
    image_url: PropTypes.string,
    id: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    onDeleteClick: PropTypes.func,
};
