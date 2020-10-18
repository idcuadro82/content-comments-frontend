import COMMENT_EXCLUDED_BLOCKS from '../configs/CommentExcludedBlocks';

export const isBlockExcludedComment = (blockType: string) => {
  return COMMENT_EXCLUDED_BLOCKS.find(item => item.blockType === blockType);
}

