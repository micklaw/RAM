using Dotented;
using Dotented.Interfaces;
using RAM.Components;

namespace RAM.Pages
{
    public class Home : BasePage
    {
        public static string Query = @"
            query {
                pages: homeCollection (limit: 1) {
                    items {
                        __typename
                        url
                        pageTitle
                        pageDescription
                        projects: projectsCollection {
                            items {
                                __typename
                                url
                                title
                                area
                                date
                                content
                                images: imagesCollection {
                                    items {
                                        __typename
                                        title
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ";

        public DotentedCollection<Project> Projects { get; set; }
    }
}