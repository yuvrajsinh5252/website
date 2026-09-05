/**
 * Barrel for all portfolio content.
 * Import from `@/data` rather than reaching into individual files.
 */
export { profile } from './profile'
export { projects, featuredProjects, getProjectBySlug } from './projects'
export { posts, featuredPosts, getPostBySlug } from './posts'
export { experiences, education, certifications, currentPosition } from './experience'
export { skills, skillGroups, orbitSkills } from './skills'
export { aboutFrames } from './photos'
