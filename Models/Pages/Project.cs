using System.Collections.Generic;
using Dotented;
using Dotented.Interfaces;
using RAM.Components;

namespace RAM.Pages
{
    public class Project : BasePage
    {
        public static string Query = @"
            query {
                pages: projectCollection {
                    items {
                        __typename
                        url
                        pageTitle
                        pageDescription
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
        ";

        public string Title { get; set; }

        public string Area { get; set; }

        public string Date { get; set; }

        public string Content { get; set; }
        
        public DotentedCollection<Asset> Images { get; set; }
    }
}