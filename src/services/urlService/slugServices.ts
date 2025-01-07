// const slugToTitle = {
//   'home': 'Home',
//   'business-nature': 'Business Nature'
// }

export const convertSlugToTitle = (slug: string) => {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
