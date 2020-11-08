using Dotented;
using Dotented.Interfaces;
using RAM.Components;

namespace RAM.Pages
{
    public class Contact : BasePage
    {
        public static string Query = @"
            query {
                pages: contactCollection (limit: 1) {
                    items {
                        __typename
                        address1
                        address2
                        phone1
                        phone2
                        email1
                        email2
                        url
                        pageTitle
                        pageDescription
                    }
                }
            }
        ";

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Phone1 { get; set; }

        public string Phone2 { get; set; }

        public string Email1 { get; set; }

        public string Email2 { get; set; }
    }
}