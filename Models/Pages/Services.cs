using Dotented;
using Dotented.Interfaces;
using RAM.Components;

namespace RAM.Pages
{
    public class Services : BasePage
    {
        public static string Query = @"
            query {
                pages: servicesCollection (limit: 1) {
                    items {
                        __typename
                        url
                        pageTitle
                        pageDescription
                        title
                        jobs: jobsCollection {
                            items {
                                __typename
                                icon
                                title
                                description                                
                            }
                        }
                    }
                }
            }
        ";

        public string Title { get; set; }

        public DotentedCollection<Service> Jobs { get; set; }
    }
}