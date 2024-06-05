(function()
{
	return function()
	{
		nexacro._setCSSMaps(
		{
            "Form" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"color" : nexacro.ColorObject("#444444"),
            						"font" : nexacro.FontObject("9pt Dotum")
            					}
            				},
            				"class" :
            				[
            					{
            						"form_WF_InfoLT" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b")
            								}
            							}
            						}
            					}
            				]
            			},
            			"VScrollBarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"padding" : nexacro.PaddingObject("2px")
            					},
            					"disabled" :
            					{
            						"padding" : nexacro.PaddingObject("2px")
            					}
            				}
            			},
            			"decbutton" :
            			{
            				"parent" :
            				{
            					"VScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_DecN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_DecN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_DecO.png\")")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_DecP.png\")")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_DecD.png\")")
            							}
            						}
            					},
            					"HScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_DecN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_DecN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_DecO.png\")")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_DecP.png\")")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_DecD.png\")")
            							}
            						}
            					}
            				}
            			},
            			"incbutton" :
            			{
            				"parent" :
            				{
            					"VScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_IncN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_IncN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_IncO.png\")")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_IncP.png\")")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Vscl_WF_IncD.png\")")
            							}
            						}
            					},
            					"HScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_IncN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_IncN.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_IncO.png\")")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_IncP.png\")")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/Hscl_WF_IncD.png\")")
            							}
            						}
            					}
            				}
            			},
            			"HScrollBarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"padding" : nexacro.PaddingObject("2px")
            					},
            					"disabled" :
            					{
            						"padding" : nexacro.PaddingObject("2px")
            					}
            				}
            			},
            			"trackbar" :
            			{
            				"parent" :
            				{
            					"VScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #4a4a4a, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #585858, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #585858, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("1px solid #666666, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"disabled" :
            							{
            							}
            						}
            					},
            					"HScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #4a4a4a, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #585858, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #585858, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("1px solid #666666, 0px solid transparent, 0px solid transparent, 0px solid transparent")
            							},
            							"disabled" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"Button" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"color" : nexacro.ColorObject("#000000"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#000000"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"padding" : nexacro.PaddingObject("0px 0px 0px 0px")
            					},
            					"mouseover" :
            					{
            						"color" : nexacro.ColorObject("#000000")
            					},
            					"pushed" :
            					{
            						"color" : nexacro.ColorObject("#000000")
            					}
            				},
            				"class" :
            				[
            					{
            						"btn_WF_ColBand" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								}
            							}
            						}
            					},
            					{
            						"btn_WF_sptX" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_WF_sptXP" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_WF_sptY" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_WF_sptYP" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_ExpandCell" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_DisplayCell" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"btn_DP" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #0F0F0F"),
            									"color" : nexacro.ColorObject("#cccccc"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"btn_Expand" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #0F0F0F"),
            									"color" : nexacro.ColorObject("#cccccc"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"btn_POP_dialog" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #0F0F0F"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"disabled" :
            								{
            									"color" : nexacro.ColorObject("#505050")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid #E75443"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("1px solid #E75443"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("1px solid #008A9A"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"btn_POP_close" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/btn_POP_closeN.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/btn_POP_closeN.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/btn_POP_closeO.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/btn_POP_closeP.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"left_menu1" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 35px")
            								},
            								"disabled" :
            								{
            									"color" : nexacro.ColorObject("#999999"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 35px")
            								},
            								"mouseover" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 35px")
            								},
            								"selected" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 35px")
            								},
            								"pushed" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 35px")
            								},
            								"focused" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 35px")
            								}
            							}
            						}
            					},
            					{
            						"left_menu2" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 17px"),
            									"icon" : nexacro.UrlObject("URL(\"theme://Img/Chart/left_text_icon.png\")"),
            									"iconPosition" : "left",
            									"textPadding" : nexacro.PaddingObject("4px")
            								},
            								"disabled" :
            								{
            									"color" : nexacro.ColorObject("#999999"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 17px"),
            									"icon" : nexacro.UrlObject("URL(\"theme://Img/Chart/left_text_icon.png\")"),
            									"iconPosition" : "left",
            									"textPadding" : nexacro.PaddingObject("4px")
            								},
            								"mouseover" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 17px"),
            									"icon" : nexacro.UrlObject("URL(\"theme://Img/Chart/left_text_icon.png\")"),
            									"iconPosition" : "left",
            									"textPadding" : nexacro.PaddingObject("4px")
            								},
            								"selected" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 17px"),
            									"icon" : nexacro.UrlObject("URL(\"theme://Img/Chart/left_text_icon.png\")"),
            									"iconPosition" : "left",
            									"textPadding" : nexacro.PaddingObject("4px")
            								},
            								"pushed" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 17px"),
            									"icon" : nexacro.UrlObject("URL(\"theme://Img/Chart/left_text_icon.png\")"),
            									"iconPosition" : "left",
            									"textPadding" : nexacro.PaddingObject("4px")
            								},
            								"focused" :
            								{
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt \"Segoe UI\""),
            									"border" : nexacro.BorderObject("0px none"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 17px"),
            									"icon" : nexacro.UrlObject("URL(\"theme://Img/Chart/left_text_icon.png\")"),
            									"iconPosition" : "left",
            									"textPadding" : nexacro.PaddingObject("4px")
            								}
            							}
            						}
            					},
            					{
            						"left_palette" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								}
            							}
            						}
            					},
            					{
            						"btn_check" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover_selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_view" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover_selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_add" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_del" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_expand" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_collapse" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_type_open" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_fill" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"btn_type01" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_type02" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_type03" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_type04" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_type05" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_type06" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_type07" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            								},
            								"pushed" :
            								{
            								},
            								"selected" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"btn_temp01" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp02" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp03" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp04" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp05" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp06" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp07" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					},
            					{
            						"btn_temp08" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #000000")
            								},
            								"focused" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"pushed" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								},
            								"selected" :
            								{
            									"border" : nexacro.BorderObject("2px solid #ff3000")
            								}
            							}
            						}
            					}
            				]
            			},
            			"Calendar" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"color" : nexacro.ColorObject("#cccccc"),
            						"font" : nexacro.FontObject("8pt Verdana")
            					}
            				}
            			},
            			"calendaredit" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#cccccc"),
            								"font" : nexacro.FontObject("8pt Verdana"),
            								"padding" : nexacro.PaddingObject("0px 9px 0px 9px")
            							}
            						}
            					}
            				}
            			},
            			"dropbutton" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Calendar.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("1px 2px 0px 0px")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Calendar.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("1px 2px 0px 0px")
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Calendar.png\")"),
            								"iconPosition" : "left",
            								"padding" : nexacro.PaddingObject("1px 2px 0px 0px")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px dotted #777777")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Calendar_D.png\")")
            							}
            						}
            					},
            					"Combo" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none")
            							}
            						}
            					}
            				}
            			},
            			"calendarspinupbutton" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spinup.png\")"),
            								"iconPosition" : "left"
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spinup.png\")"),
            								"iconPosition" : "left"
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spinup.png\")"),
            								"iconPosition" : "left"
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spinup.png\")"),
            								"iconPosition" : "left"
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spinup_D.png\")")
            							}
            						}
            					}
            				}
            			},
            			"calendarspindownbutton" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spindown.png\")"),
            								"iconPosition" : "left"
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spindown.png\")"),
            								"iconPosition" : "left"
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("0px none"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spindown.png\")"),
            								"iconPosition" : "left"
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px dotted #777777")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_WF_Spindown_D.png\")")
            							}
            						}
            					}
            				}
            			},
            			"spinupbutton" :
            			{
            				"parent" :
            				{
            					"yearspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"border" : nexacro.BorderObject("0px none"),
            												"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_CalHeadSpinUp_N.png\")")
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"monthspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"border" : nexacro.BorderObject("0px none"),
            												"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_CalHeadSpinUp_N.png\")")
            											}
            										}
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"spindownbutton" :
            			{
            				"parent" :
            				{
            					"yearspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"border" : nexacro.BorderObject("0px none"),
            												"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_CalHeadSpinDown_N.png\")")
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"monthspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"border" : nexacro.BorderObject("0px none"),
            												"icon" : nexacro.UrlObject("URL(\"theme://Img/btn_CalHeadSpinDown_N.png\")")
            											}
            										}
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"CheckBox" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"iconPosition" : "left",
            						"icon" : nexacro.UrlObject("URL(\"theme://Img/img_WF_CheckBox.png\")"),
            						"color" : nexacro.ColorObject("#000000"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"padding" : nexacro.PaddingObject("0px 0px 0px 0px"),
            						"textPadding" : nexacro.PaddingObject("0px 0px 1px 3px")
            					},
            					"mouseover" :
            					{
            						"icon" : nexacro.UrlObject("URL(\"theme://Img/img_WF_CheckBox_O.png\")")
            					},
            					"disabled" :
            					{
            						"icon" : nexacro.UrlObject("URL(\"theme://Img/img_WF_CheckBox_D.png\")"),
            						"color" : nexacro.ColorObject("#969696")
            					},
            					"selected" :
            					{
            						"icon" : nexacro.UrlObject("URL(\"theme://Img/img_WF_CheckBoxS.png\")")
            					}
            				}
            			},
            			"Combo" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #212121, 1px solid #4d4d4d, 1px solid #4d4d4d, 1px solid #212121"),
            						"color" : nexacro.ColorObject("#cccccc"),
            						"font" : nexacro.FontObject("8pt Verdana")
            					}
            				}
            			},
            			"comboedit" :
            			{
            				"parent" :
            				{
            					"Combo" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#cccccc"),
            								"font" : nexacro.FontObject("8pt Verdana"),
            								"padding" : nexacro.PaddingObject("0px 9px 0px 9px")
            							},
            							"mouseover" :
            							{
            								"color" : nexacro.ColorObject("#cccccc"),
            								"font" : nexacro.FontObject("8pt Verdana"),
            								"padding" : nexacro.PaddingObject("0px 9px 0px 9px")
            							}
            						}
            					}
            				}
            			},
            			"combolist" :
            			{
            				"parent" :
            				{
            					"Combo" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #8e8e8e")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px dotted #777777")
            							}
            						}
            					}
            				}
            			},
            			"Div" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"color" : nexacro.ColorObject("#000000")
            					}
            				},
            				"class" :
            				[
            					{
            						"div_WF_InfoDivLT" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b")
            								}
            							}
            						}
            					},
            					{
            						"div_dialog_bg" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #1f1f1f")
            								}
            							}
            						}
            					},
            					{
            						"left_div" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #6c6c6c")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid #6c6c6c")
            								}
            							}
            						}
            					},
            					{
            						"top_div" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #a3a4a8 , 1px solid #a3a4a8 , 1px solid #a3a4a8 , 0px none"),
            									"color" : nexacro.ColorObject("#313131"),
            									"font" : nexacro.FontObject("bold 14pt \"Segoe UI\"")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid #a3a4a8 , 1px solid #a3a4a8 , 1px solid #a3a4a8 , 0px none"),
            									"color" : nexacro.ColorObject("#313131"),
            									"font" : nexacro.FontObject("bold 14pt \"Segoe UI\"")
            								}
            							}
            						}
            					}
            				]
            			},
            			"Edit" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #bdbdbd"),
            						"color" : nexacro.ColorObject("#000000"),
            						"padding" : nexacro.PaddingObject("0px 9px 0px 9px")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #0f7ec5")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px dotted #777777")
            					},
            					"disabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #cfcfcf"),
            						"color" : nexacro.ColorObject("#aeaeae")
            					}
            				}
            			},
            			"PopupMenu" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"color" : nexacro.ColorObject("#333333"),
            						"padding" : nexacro.PaddingObject("1px 2px 1px 5px")
            					},
            					"mouseover" :
            					{
            						"color" : nexacro.ColorObject("#ffffff")
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#8f8f8f")
            					}
            				}
            			},
            			"Grid" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #6477ad,1px solid #c9c9c9,1px solid #76b9cc,0px none"),
            						"color" : nexacro.ColorObject("#000000")
            					}
            				}
            			},
            			"head" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none,0px none,1px solid #6477ad,1px solid #6477ad")
            							}
            						}
            					}
            				}
            			},
            			"body" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #e1e1e1,0px none,0px none,1px solid #c9c9c9")
            							}
            						}
            					}
            				}
            			},
            			"summary" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a1d9e9,0px none,0px none,1px solid #a1d9e9")
            							}
            						}
            					}
            				}
            			},
            			"hscrollbar" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #cfcfcf,0px none,0px none,1px solid #cfcfcf")
            							}
            						}
            					}
            				}
            			},
            			"GroupBox" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #424242"),
            						"color" : nexacro.ColorObject("#b3b3b3"),
            						"font" : nexacro.FontObject("bold 8pt Verdana")
            					},
            					"disabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #424242"),
            						"color" : nexacro.ColorObject("#b3b3b3"),
            						"font" : nexacro.FontObject("bold 8pt Verdana")
            					}
            				}
            			},
            			"Radio" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"color" : nexacro.ColorObject("#efefef")
            					}
            				}
            			},
            			"radioitem" :
            			{
            				"parent" :
            				{
            					"Radio" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"textPadding" : nexacro.PaddingObject("0px 0px 0px 5px"),
            								"icon" : nexacro.UrlObject("URL(\"theme://Img/rdo_POP_btnD.png\")"),
            								"iconPosition" : "left"
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("url(\"theme://Img/rdo_POP_btnO.png\")")
            							},
            							"selected" :
            							{
            								"icon" : nexacro.UrlObject("url(\"theme://Img/rdo_POP_btnS.png\")")
            							}
            						}
            					}
            				}
            			},
            			"Static" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"color" : nexacro.ColorObject("#999999"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"letterSpacing" : nexacro.CSSValueObject("0px"),
            						"wordSpacing" : nexacro.CSSValueObject("0px")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"color" : nexacro.ColorObject("#999999"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"letterSpacing" : nexacro.CSSValueObject("0px"),
            						"wordSpacing" : nexacro.CSSValueObject("0px")
            					},
            					"disabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"color" : nexacro.ColorObject("#999999"),
            						"font" : nexacro.FontObject("8pt Verdana"),
            						"letterSpacing" : nexacro.CSSValueObject("0px"),
            						"wordSpacing" : nexacro.CSSValueObject("0px")
            					}
            				},
            				"class" :
            				[
            					{
            						"sta_WF_Col_Band" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #2b2b2b,1px solid #171717,1px solid #171717,1px solid #2b2b2b"),
            									"color" : nexacro.ColorObject("#cbcbcb"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"letterSpacing" : nexacro.CSSValueObject("0px"),
            									"wordSpacing" : nexacro.CSSValueObject("0px")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_SizeH" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_SizeW" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_Line" :
            						{
            							"self" :
            							{
            								"mouseover" :
            								{
            								},
            								"disabled" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_GuideLineX" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px dotted #007fff,0px none,0px none,0px none")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px dotted #007fff,0px none,0px none,0px none")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("1px dotted #007fff,0px none,0px none,0px none")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_GuideLineY" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none,0px none,0px none,1px dotted #007fff")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none,0px none,0px none,1px dotted #007fff")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none,0px none,0px none,1px dotted #007fff")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_Cell_Background" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none, 1px solid #171717, 1px solid #171717, 0px none")
            								}
            							},
            							"class" :
            							[
            								{
            									"Cell" :
            									{
            										"self" :
            										{
            											"disabled" :
            											{
            												"border" : nexacro.BorderObject("0px none, 1px solid #171717, 1px solid #171717, 0px none")
            											}
            										}
            									}
            								}
            							]
            						}
            					},
            					{
            						"sta_DP_tree" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"color" : nexacro.ColorObject("#999999"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"sta_spt_cross" :
            						{
            							"self" :
            							{
            								"mouseover" :
            								{
            								},
            								"disabled" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"sta_spt_crossP" :
            						{
            							"self" :
            							{
            								"mouseover" :
            								{
            								},
            								"disabled" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_ExpandCell" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid pink"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid pink"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid pink"),
            									"color" : nexacro.ColorObject("#000000"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"sta_POP_titlebg" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/sta_POP_titlebg.png\") 1px 0px"),
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#adadad"),
            									"font" : nexacro.FontObject("9pt Verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 2px 10px")
            								},
            								"mouseover" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/sta_POP_titlebg.png\") 1px 0px"),
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#adadad"),
            									"font" : nexacro.FontObject("9pt Verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 2px 10px")
            								},
            								"disabled" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/sta_POP_titlebg.png\") 1px 0px"),
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#adadad"),
            									"font" : nexacro.FontObject("9pt Verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 2px 10px")
            								}
            							}
            						}
            					},
            					{
            						"sta_POP_textbg" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/sta_POP_textbg.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("1px solid #1d1d1d #474747 #474747 #1d1d1d"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 58px")
            								},
            								"mouseover" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/sta_POP_textbg.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("1px solid #1d1d1d #474747 #474747 #1d1d1d"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 58px")
            								},
            								"disabled" :
            								{
            									"edge" : nexacro.EdgeImageObject("URL(\"theme://Img/sta_POP_textbg.png\") 0px 0px"),
            									"border" : nexacro.BorderObject("1px solid #1d1d1d #474747 #474747 #1d1d1d"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 58px")
            								}
            							}
            						}
            					},
            					{
            						"sta_POP_text" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt Verdana")
            								}
            							}
            						}
            					},
            					{
            						"sta_WF_resize" :
            						{
            							"self" :
            							{
            								"mouseover" :
            								{
            								},
            								"disabled" :
            								{
            								}
            							}
            						}
            					},
            					{
            						"left_title" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #6c6c6c"),
            									"font" : nexacro.FontObject("9pt \"Segoe UI\""),
            									"color" : nexacro.ColorObject("#dadada"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 12px")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("1px solid #6c6c6c"),
            									"font" : nexacro.FontObject("9pt \"Segoe UI\""),
            									"color" : nexacro.ColorObject("#dadada"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 12px")
            								}
            							}
            						}
            					},
            					{
            						"left_subtitle" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"font" : nexacro.FontObject("bold 9pt \"Segoe UI\""),
            									"color" : nexacro.ColorObject("#4e4d4d"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 45px")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"font" : nexacro.FontObject("bold 9pt \"Segoe UI\""),
            									"color" : nexacro.ColorObject("#4e4d4d"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 45px")
            								}
            							}
            						}
            					},
            					{
            						"pop_color_title" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"font" : nexacro.FontObject("bold 9pt \"Segoe UI\""),
            									"color" : nexacro.ColorObject("#e0e0e0")
            								},
            								"mouseover" :
            								{
            									"border" : nexacro.BorderObject("0px none"),
            									"font" : nexacro.FontObject("bold 9pt \"Segoe UI\""),
            									"color" : nexacro.ColorObject("#e0e0e0")
            								}
            							}
            						}
            					}
            				]
            			},
            			"ProgressBar" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #161616"),
            						"padding" : nexacro.PaddingObject("2px 2px 2px 2px")
            					}
            				}
            			},
            			"MaskEdit" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #1d1d1d,1px solid #474747,1px solid #474747,1px solid #1d1d1d"),
            						"color" : nexacro.ColorObject("#ffffff"),
            						"font" : nexacro.FontObject("8pt verdana"),
            						"padding" : nexacro.PaddingObject("0px 0px 0px 2px")
            					}
            				},
            				"class" :
            				[
            					{
            						"mask_POP_direct" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #1d1d1d,1px solid #474747,1px solid #474747,1px solid #1d1d1d"),
            									"color" : nexacro.ColorObject("#ffffff"),
            									"font" : nexacro.FontObject("8pt verdana"),
            									"padding" : nexacro.PaddingObject("0px 0px 0px 2px")
            								},
            								"disabled" :
            								{
            									"border" : nexacro.BorderObject("1px solid #3b3b3b"),
            									"color" : nexacro.ColorObject("#aeaeae")
            								}
            							}
            						}
            					}
            				]
            			},
            			"PopupDiv" :
            			{
            				"class" :
            				[
            					{
            						"popdiv_color" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("2px solid #666666")
            								}
            							}
            						}
            					},
            					{
            						"popdiv_type" :
            						{
            							"self" :
            							{
            								"enabled" :
            								{
            									"border" : nexacro.BorderObject("2px solid #666666")
            								}
            							}
            						}
            					}
            				]
            			}
		},
		{
            "includeStatusMap" : true
		}
		);
		var imgcache = nexacro._getImageCacheMaps();
        imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_DecN.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_DecO.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_DecP.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_DecD.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_IncN.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_IncO.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_IncP.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Vscl_WF_IncD.png")] = { width:7, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_DecN.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_DecO.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_DecP.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_DecD.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_IncN.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_IncO.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_IncP.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_IncD.png")] = { width:6, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_Calendar.png")] = { width:15, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_Calendar_D.png")] = { width:15, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_Spinup.png")] = { width:5, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_Spinup_D.png")] = { width:5, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_Spindown.png")] = { width:5, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_Spindown_D.png")] = { width:5, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_CalHeadSpinUp_N.png")] = { width:6, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_CalHeadSpinDown_N.png")] = { width:6, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_CheckBox.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_CheckBox_O.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_CheckBox_D.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_CheckBoxS.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/cmb_WF_Drop.png")] = { width:7, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/rdo_POP_btnD.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/rdo_POP_btnO.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/rdo_POP_btnS.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptXN.png")] = { width:1, height:5 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptXP.png")] = { width:2, height:5 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptYN.png")] = { width:5, height:1 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptYP.png")] = { width:5, height:2 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_POP_closeN.png")] = { width:18, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_POP_closeO.png")] = { width:18, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_POP_closeP.png")] = { width:18, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_SizeH.png")] = { width:6, height:1 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_SizeW.png")] = { width:1, height:6 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_image.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_line_child.png")] = { width:17, height:2 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_btn_plus.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_btn_minus.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_btn_none.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_ck_checked.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_ck_unchecked.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_img_collapse.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_img_expand.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_DP_tree_img_item.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/sta_up.png")] = { width:9, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/sta_down.png")] = { width:9, height:7 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_spt_cross.png")] = { width:5, height:5 };
        		imgcache[nexacro._getImageLocation("theme://Img/sta_POP_titlebg.png")] = { width:3, height:23 };
        		imgcache[nexacro._getImageLocation("theme://Img/sta_POP_textbg.png")] = { width:45, height:27 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_text_icon.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_check_N.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_check_O.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_check_S.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_visible_off_N.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_visible_off_O.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_visible_on_O.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_add_N.png")] = { width:18, height:18 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_add_S.png")] = { width:18, height:18 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_del_N.png")] = { width:18, height:18 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_del_S.png")] = { width:18, height:18 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/title_btn_open.png")] = { width:15, height:23 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/title_btn_close.png")] = { width:15, height:23 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/serise_type_N.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/serise_type_S.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_fill_N.png")] = { width:18, height:18 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_fill_S.png")] = { width:18, height:18 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_01_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_02_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_03_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_04_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_05_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_06_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_07_N.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_01_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_02_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_03_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_04_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_05_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_06_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/type_07_S.png")] = { width:48, height:48 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp01_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp02_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp03_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp04_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp05_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp06_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp07_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_color_temp08_N.png")] = { width:36, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/body.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/copy.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/cut.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/del.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/delete_body.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/delete_detail.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/delete_head.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/detail.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/head.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/paste.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/redo.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/Auto/undo.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalNext.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalNext_D.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalNext_O.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalPrev.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalPrev_D.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalPrev_O.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalSpindown.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalSpindown_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalSpindown_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalSpinup.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalSpinup_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_CalSpinup_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptXD.png")] = { width:1, height:5 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptXO.png")] = { width:1, height:5 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptYD.png")] = { width:5, height:1 };
        		imgcache[nexacro._getImageLocation("theme://Img/btn_WF_sptYO.png")] = { width:5, height:1 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_WF_Check.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_WF_Check_D.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_WF_Check_DS.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_WF_Check_O.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/btn_WF_Check_S.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp01_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp02_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp03_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp04_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp05_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp06_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp07_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/color_temp08_N.png")] = { width:48, height:28 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/img_check_NN.png")] = { width:21, height:21 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/img_check_NS.png")] = { width:21, height:21 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/img_check_ON.png")] = { width:21, height:21 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/img_check_OS.png")] = { width:21, height:21 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_add_btn_N.png")] = { width:24, height:24 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_add_btn_S.png")] = { width:24, height:24 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_del_btn_N.png")] = { width:24, height:24 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_del_btn_S.png")] = { width:24, height:24 };
        		imgcache[nexacro._getImageLocation("theme://Img/Chart/left_visible_on_N.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/cmb_WF_Drop_D.png")] = { width:7, height:4 };
        		imgcache[nexacro._getImageLocation("theme://Img/grp_POP_img.png")] = { width:20, height:3 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_TrackbarImg.png")] = { width:73, height:15 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_TrackbarImgO.png")] = { width:73, height:15 };
        		imgcache[nexacro._getImageLocation("theme://Img/Hscl_WF_TrackbarImgP.png")] = { width:73, height:15 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_cell_O.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_cell_S.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_CheckBoxS_D.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_CheckBoxS_O.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_TreeClose.png")] = { width:14, height:12 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_TreeItem.png")] = { width:10, height:12 };
        		imgcache[nexacro._getImageLocation("theme://Img/img_WF_TreeOpen.png")] = { width:14, height:12 };
        		imgcache[nexacro._getImageLocation("theme://Img/lsv_WF_expandBar.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/lsv_WF_expandBar_N.png")] = { width:17, height:17 };
        		imgcache[nexacro._getImageLocation("theme://Img/lsv_WF_expandBar_S.png")] = { width:17, height:17 };
	};
}
)();
