import PageElementTypeMap, { BlockTypes } from '../models/utils/PageElementTypesMap';

const COMMENT_EXCLUDED_BLOCKS: { blockType: string }[] = [
  { blockType: PageElementTypeMap.get(BlockTypes.BORDERED_CONTAINER) },
  { blockType: PageElementTypeMap.get(BlockTypes.DIVIDER) },
];

export default COMMENT_EXCLUDED_BLOCKS;
