(function ($) {
	var DatePicker = function () {
		var	ids = {},
			views = {
				years: 'datepickerViewYears',
				moths: 'datepickerViewMonths',
				days: 'datepickerViewDays'
			},
			tpl = {
				wrapper: '<div class="datepicker"><div class="datepickerContainer"><br class="clear" /></div></div>',
				head: [
					'<div class="datepicker-col">',
					'<table cellspacing="0" cellpadding="0">',
						'<thead>',
							'<tr>',
								'<th class="datepickerGoPrev"><span class="datepicker-link"></span></th>',
								'<th colspan="5" class="datepickerMonth"><span class="datepicker-link"><span></span></span></th>',
								'<th class="datepickerGoNext"><span class="datepicker-link"></span></th>',
							'</tr>',
							'<tr class="datepickerDoW">',
								//'<th><span><%=week%></span></th>',
								'<th><span><%=day1%></span></th>',
								'<th><span><%=day2%></span></th>',
								'<th><span><%=day3%></span></th>',
								'<th><span><%=day4%></span></th>',
								'<th><span><%=day5%></span></th>',
								'<th><span><%=day6%></span></th>',
								'<th><span><%=day7%></span></th>',
							'</tr>',
						'</thead>',
					'</table></div>'
				],
				space : '',
				days: [
					'<tbody class="datepickerDays">',
						'<tr>',
							//'<th class="datepickerWeek"><span class="datepicker-link"><span><%=weeks[0].week%></span></span></th>',
							'<td class="<%=weeks[0].days[0].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[0].text%></span></span></td>',
							'<td class="<%=weeks[0].days[1].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[1].text%></span></span></td>',
							'<td class="<%=weeks[0].days[2].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[2].text%></span></span></td>',
							'<td class="<%=weeks[0].days[3].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[3].text%></span></span></td>',
							'<td class="<%=weeks[0].days[4].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[4].text%></span></span></td>',
							'<td class="<%=weeks[0].days[5].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[5].text%></span></span></td>',
							'<td class="<%=weeks[0].days[6].classname%>"><span class="datepicker-link"><span><%=weeks[0].days[6].text%></span></span></td>',
						'</tr>',
						'<tr>',
							//'<th class="datepickerWeek"><span class="datepicker-link"><span><%=weeks[1].week%></span></span></th>',
							'<td class="<%=weeks[1].days[0].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[0].text%></span></span></td>',
							'<td class="<%=weeks[1].days[1].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[1].text%></span></span></td>',
							'<td class="<%=weeks[1].days[2].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[2].text%></span></span></td>',
							'<td class="<%=weeks[1].days[3].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[3].text%></span></span></td>',
							'<td class="<%=weeks[1].days[4].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[4].text%></span></span></td>',
							'<td class="<%=weeks[1].days[5].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[5].text%></span></span></td>',
							'<td class="<%=weeks[1].days[6].classname%>"><span class="datepicker-link"><span><%=weeks[1].days[6].text%></span></span></td>',
						'</tr>',
						'<tr>',
							//'<th class="datepickerWeek"><span class="datepicker-link"><span><%=weeks[2].week%></span></span></th>',
							'<td class="<%=weeks[2].days[0].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[0].text%></span></span></td>',
							'<td class="<%=weeks[2].days[1].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[1].text%></span></span></td>',
							'<td class="<%=weeks[2].days[2].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[2].text%></span></span></td>',
							'<td class="<%=weeks[2].days[3].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[3].text%></span></span></td>',
							'<td class="<%=weeks[2].days[4].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[4].text%></span></span></td>',
							'<td class="<%=weeks[2].days[5].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[5].text%></span></span></td>',
							'<td class="<%=weeks[2].days[6].classname%>"><span class="datepicker-link"><span><%=weeks[2].days[6].text%></span></span></td>',
						'</tr>',
						'<tr>',
							//'<th class="datepickerWeek"><span class="datepicker-link"><span><%=weeks[3].week%></span></span></th>',
							'<td class="<%=weeks[3].days[0].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[0].text%></span></span></td>',
							'<td class="<%=weeks[3].days[1].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[1].text%></span></span></td>',
							'<td class="<%=weeks[3].days[2].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[2].text%></span></span></td>',
							'<td class="<%=weeks[3].days[3].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[3].text%></span></span></td>',
							'<td class="<%=weeks[3].days[4].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[4].text%></span></span></td>',
							'<td class="<%=weeks[3].days[5].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[5].text%></span></span></td>',
							'<td class="<%=weeks[3].days[6].classname%>"><span class="datepicker-link"><span><%=weeks[3].days[6].text%></span></span></td>',
						'</tr>',
						'<tr>',
							//'<th class="datepickerWeek"><span class="datepicker-link"><span><%=weeks[4].week%></span></span></th>',
							'<td class="<%=weeks[4].days[0].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[0].text%></span></span></td>',
							'<td class="<%=weeks[4].days[1].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[1].text%></span></span></td>',
							'<td class="<%=weeks[4].days[2].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[2].text%></span></span></td>',
							'<td class="<%=weeks[4].days[3].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[3].text%></span></span></td>',
							'<td class="<%=weeks[4].days[4].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[4].text%></span></span></td>',
							'<td class="<%=weeks[4].days[5].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[5].text%></span></span></td>',
							'<td class="<%=weeks[4].days[6].classname%>"><span class="datepicker-link"><span><%=weeks[4].days[6].text%></span></span></td>',
						'</tr>',
						'<tr>',
							//'<th class="datepickerWeek"><span class="datepicker-link"><span><%=weeks[5].week%></span></span></th>',
							'<td class="<%=weeks[5].days[0].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[0].text%></span></span></td>',
							'<td class="<%=weeks[5].days[1].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[1].text%></span></span></td>',
							'<td class="<%=weeks[5].days[2].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[2].text%></span></span></td>',
							'<td class="<%=weeks[5].days[3].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[3].text%></span></span></td>',
							'<td class="<%=weeks[5].days[4].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[4].text%></span></span></td>',
							'<td class="<%=weeks[5].days[5].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[5].text%></span></span></td>',
							'<td class="<%=weeks[5].days[6].classname%>"><span class="datepicker-link"><span><%=weeks[5].days[6].text%></span></span></td>',
						'</tr>',
					'</tbody>'
				],
				months: [
					'<tbody class="<%=className%>">',
						'<tr>',
							'<td colspan="2" class="<%=data[0].cl%>"><span class="datepicker-link"><span><%=data[0].name%></span></span></td>',
							'<td colspan="2" class="<%=data[1].cl%>"><span class="datepicker-link"><span><%=data[1].name%></span></span></td>',
							'<td colspan="2" class="<%=data[2].cl%>"><span class="datepicker-link"><span><%=data[2].name%></span></span></td>',
							'<td colspan="2" class="<%=data[3].cl%>"><span class="datepicker-link"><span><%=data[3].name%></span></span></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2" class="<%=data[4].cl%>"><span class="datepicker-link"><span><%=data[4].name%></span></span></td>',
							'<td colspan="2" class="<%=data[5].cl%>"><span class="datepicker-link"><span><%=data[5].name%></span></span></td>',
							'<td colspan="2" class="<%=data[6].cl%>"><span class="datepicker-link"><span><%=data[6].name%></span></span></td>',
							'<td colspan="2" class="<%=data[7].cl%>"><span class="datepicker-link"><span><%=data[7].name%></span></span></td>',
						'</tr>',
						'<tr>',
							'<td colspan="2" class="<%=data[8].cl%>"><span class="datepicker-link"><span><%=data[8].name%></span></span></td>',
							'<td colspan="2" class="<%=data[9].cl%>"><span class="datepicker-link"><span><%=data[9].name%></span></span></td>',
							'<td colspan="2" class="<%=data[10].cl%>"><span class="datepicker-link"><span><%=data[10].name%></span></span></td>',
							'<td colspan="2" class="<%=data[11].cl%>"><span class="datepicker-link"><span><%=data[11].name%></span></span></td>',
						'</tr>',
					'</tbody>'
				]
			},
			defaults = {
				flat: false,
				starts: 1,
				prev: '&#9664;',
				next: '&#9654;',
				lastSel: false,
				mode: 'single',
				view: 'days',
				calendars: 1,
				format: 'Y-m-d',
				position: 'bottom',
				eventName: 'click',
				onRender: function(){return {};},
				onChange: function(){return true;},
				onShow: function(){return true;},
				onBeforeShow: function(){return true;},
				onHide: function () { return true; },
				onFocusChange: function () { return; },
                onCalendarMaxDateChange: function () { return; },
				locale: {
					days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
					daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
					months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					weekMin: 'wk'
				}
			},
			fill = function(el) {
				var options = $(el).data('datepicker');
				var cal = $(el);
				var date, data, dow, month, cnt = 0, week, days, indic, indic2, html, tblCal;
			    
				cal.find('table > tbody').remove();
			    
				for (var i = 0; i < options.calendars; i++) {
				    //debugger;
				    if (options.current < options.minDate) {
				        options.current = new Date(options.minDate.getTime());
				    }
				    if (options.current > options.maxDate) {
				        options.current = new Date(options.maxDate.getTime());
				    }
				    
				    date = new Date(options.current);
				    //1 -- -1 + 0 = -1
				    //2 -- -1 + 0 = -1 | -1 + 1 = 0
				    //3 -- -1 + 0 = -1 | -1 + 1 = 0| -1 + 2 = 1
				    if (options.calendars > 1) date.addMonths(-options.currentCal + i);

				    //date.addMonths( i);
					tblCal = cal.find('table').eq(i); //tblCal = cal.find('table').eq(i + 1);
					switch (tblCal[0].className) {
					    case 'datepickerViewDays':
							dow = formatDate(date, 'B, Y');
							break;
					    case 'datepickerViewMonths':
					        //dow = date.getFullYear();
					        dow = new Date(options.current).getFullYear();
							break;
						case 'datepickerViewYears':
							dow = (date.getFullYear()-6) + ' - ' + (date.getFullYear()+5);
							break;
					}
				    tblCal.find('thead tr:first th:eq(1) span').text(dow);
					dow = date.getFullYear()-6;
					data = {
						data: [],
						className: 'datepickerYears'
					}

					var minYear = options.minDate.getFullYear();
					var maxYear = options.maxDate.getFullYear();
					for (var j = 0; j < 12; j++) {
					    data.data.push({
					        name: dow + j,
					        cl: (dow + j) < minYear || (dow + j) > maxYear ? "datepickerDisabled" : ""
					    });
					}
					html = tmpl(tpl.months.join(''), data);
				    
					date.setDate(1);
					data = {weeks:[], test: 10};
					month = date.getMonth();
					var dow = (date.getDay() - options.starts) % 7;
					date.addDays(-(dow + (dow < 0 ? 7 : 0)));
					week = -1;
					cnt = 0;
					while (cnt < 42) {
						indic = parseInt(cnt/7,10);
						indic2 = cnt%7;
						if (!data.weeks[indic]) {
							week = date.getWeekNumber();
							data.weeks[indic] = {
								week: week,
								days: []
							};
						}
						data.weeks[indic].days[indic2] = {
							text: date.getDate(),
							classname: []
						};
						if (month != date.getMonth()) {
							data.weeks[indic].days[indic2].classname.push('datepickerNotInMonth');
						}
						if (date.getDay() == 0) {
							data.weeks[indic].days[indic2].classname.push('datepickerSunday');
						}
						if (date.getDay() == 6) {
							data.weeks[indic].days[indic2].classname.push('datepickerSaturday');
						}
						options.minDate && options.minDate.valueOf() > date.valueOf() && data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
						options.maxDate && options.maxDate.valueOf() < date.valueOf() && data.weeks[indic].days[indic2].classname.push('datepickerDisabled');

						var fromUser = options.onRender(date);
						var val = date.valueOf();
						if (fromUser.selected || options.date == val || $.inArray(val, options.date) > -1 || (options.mode == 'range' && val >= options.date[0] && val <= options.date[1])) {
						    data.weeks[indic].days[indic2].classname.push('datepickerSelected');

						    var toTmp = new Date(options.date[1]);
						    toTmp.setHours(0, 0, 0, 0);

						    if (options.date == val || (options.mode == 'range' && val == options.date[0])) {
						        data.weeks[indic].days[indic2].classname.push('datepickerSelectedFrom');
						        if (options.date == val) data.weeks[indic].days[indic2].classname.push('datepickerSelectedTo');
						    }
						    if (options.mode == 'range' && val == toTmp.valueOf()) {
						        data.weeks[indic].days[indic2].classname.push('datepickerSelectedTo');
						    }
                            
						}
						if (fromUser.disabled) {
							data.weeks[indic].days[indic2].classname.push('datepickerDisabled');
						}
						if (fromUser.className) {
							data.weeks[indic].days[indic2].classname.push(fromUser.className);
						}
						data.weeks[indic].days[indic2].classname = data.weeks[indic].days[indic2].classname.join(' ');
						cnt++;
						date.addDays(1);
					}
					html = tmpl(tpl.days.join(''), data) + html;
					
				    var monthDate = new Date(options.current);
					data = {
					    data: $.map(options.locale.monthsShort, function (n, i) {
					        return {
					            name: n,
					            cl: options.minDate.valueOf() > monthDate.setMonth(i + 1, 0).valueOf() || options.maxDate < (new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)).valueOf()
                                    ? "datepickerDisabled"
                                    : ""
					        };
					    }),
						className: 'datepickerMonths'
					};
					html = tmpl(tpl.months.join(''), data) + html;
					tblCal.append(html);
				}
				var cols = cal.find(".datepicker-col");			    
				cols.find(".datepickerGoPrev, .datepickerGoNext").not(".no-visiblity").addClass("no-visiblity");
			    cols = cols.filter(":not(:has(>table.hidden))");
			    cols.find(".datepickerGoPrev").first().add(cols.find(".datepickerGoNext").last()).removeClass("no-visiblity");

			    var maxMonth = new Date(options.current);
			    maxMonth.setDate(1);
			    maxMonth.setMonth(maxMonth.getMonth() - 1 + options.calendars);
			    options.onCalendarMaxDateChange(maxMonth);
			},
			parseDate = function (date, format) {
				if (date.constructor == Date) {
					return new Date(date);
				}
				var parts = date.split(/\W+/);
				var against = format.split(/\W+/), d, m, y, h, min, now = new Date();
				for (var i = 0; i < parts.length; i++) {
					switch (against[i]) {
						case 'd':
						case 'e':
							d = parseInt(parts[i],10);
							break;
						case 'm':
							m = parseInt(parts[i], 10)-1;
							break;
						case 'Y':
						case 'y':
							y = parseInt(parts[i], 10);
							y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
							break;
						case 'H':
						case 'I':
						case 'k':
						case 'l':
							h = parseInt(parts[i], 10);
							break;
						case 'P':
						case 'p':
							if (/pm/i.test(parts[i]) && h < 12) {
								h += 12;
							} else if (/am/i.test(parts[i]) && h >= 12) {
								h -= 12;
							}
							break;
						case 'M':
							min = parseInt(parts[i], 10);
							break;
					}
				}
				return new Date(
					y === undefined ? now.getFullYear() : y,
					m === undefined ? now.getMonth() : m,
					d === undefined ? now.getDate() : d,
					h === undefined ? now.getHours() : h,
					min === undefined ? now.getMinutes() : min,
					0
				);
			},
			formatDate = function (date, format) {
			    
				var m = date.getMonth();
				var d = date.getDate();
				var y = date.getFullYear();
				var wn = date.getWeekNumber();
				var w = date.getDay();
				var s = {};
				var hr = date.getHours();
				var pm = (hr >= 12);
				var ir = (pm) ? (hr - 12) : hr;
				var dy = date.getDayOfYear();
				if (ir == 0) {
					ir = 12;
				}
				var min = date.getMinutes();
				var sec = date.getSeconds();
				var parts = format.split(''), part;
				for ( var i = 0; i < parts.length; i++ ) {
					part = parts[i];
					switch (parts[i]) {
						case 'a':
							part = date.getDayName();
							break;
						case 'A':
							part = date.getDayName(true);
							break;
						case 'b':
							part = date.getMonthName();
							break;
						case 'B':
							part = date.getMonthName(true);
							break;
						case 'C':
							part = 1 + Math.floor(y / 100);
							break;
						case 'd':
							part = (d < 10) ? ("0" + d) : d;
							break;
						case 'e':
							part = d;
							break;
						case 'H':
							part = (hr < 10) ? ("0" + hr) : hr;
							break;
						case 'I':
							part = (ir < 10) ? ("0" + ir) : ir;
							break;
						case 'j':
							part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
							break;
						case 'k':
							part = hr;
							break;
						case 'l':
							part = ir;
							break;
						case 'm':
							part = (m < 9) ? ("0" + (1+m)) : (1+m);
							break;
						case 'M':
							part = (min < 10) ? ("0" + min) : min;
							break;
						case 'p':
						case 'P':
							part = pm ? "PM" : "AM";
							break;
						case 's':
							part = Math.floor(date.getTime() / 1000);
							break;
						case 'S':
							part = (sec < 10) ? ("0" + sec) : sec;
							break;
						case 'u':
							part = w + 1;
							break;
						case 'w':
							part = w;
							break;
						case 'y':
							part = ('' + y).substr(2, 2);
							break;
						case 'Y':
							part = y;
							break;
					}
					parts[i] = part;
				}
				return parts.join('');
			},
			extendDate = function(options) {
				if (Date.prototype.tempDate) {
					return;
				}
				Date.prototype.tempDate = null;
				Date.prototype.months = options.months;
				Date.prototype.monthsShort = options.monthsShort;
				Date.prototype.days = options.days;
				Date.prototype.daysShort = options.daysShort;
				Date.prototype.getMonthName = function(fullName) {
					return this[fullName ? 'months' : 'monthsShort'][this.getMonth()];
				};
				Date.prototype.getDayName = function(fullName) {
					return this[fullName ? 'days' : 'daysShort'][this.getDay()];
				};
				Date.prototype.addDays = function (n) {
					this.setDate(this.getDate() + n);
					this.tempDate = this.getDate();
				};
				Date.prototype.addMonths = function (n) {
					if (this.tempDate == null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setMonth(this.getMonth() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.addYears = function (n) {
					if (this.tempDate == null) {
						this.tempDate = this.getDate();
					}
					this.setDate(1);
					this.setFullYear(this.getFullYear() + n);
					this.setDate(Math.min(this.tempDate, this.getMaxDays()));
				};
				Date.prototype.getMaxDays = function() {
					var tmpDate = new Date(Date.parse(this)),
						d = 28, m;
					m = tmpDate.getMonth();
					d = 28;
					while (tmpDate.getMonth() == m) {
						d ++;
						tmpDate.setDate(d);
					}
					return d - 1;
				};
				Date.prototype.getFirstDay = function() {
					var tmpDate = new Date(Date.parse(this));
					tmpDate.setDate(1);
					return tmpDate.getDay();
				};
				Date.prototype.getWeekNumber = function() {
					var tempDate = new Date(this);
					tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);
					var dms = tempDate.valueOf();
					tempDate.setMonth(0);
					tempDate.setDate(4);
					return Math.round((dms - tempDate.valueOf()) / (604800000)) + 1;
				};
				Date.prototype.getDayOfYear = function() {
					var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
					var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
					var time = now - then;
					return Math.floor(time / 24*60*60*1000);
				};
			},
            changeLastSel = function (el, newValue) {
                var options = $(el).data('datepicker');
                options.lastSel = newValue;
                if (typeof (options.onFocusChange) == "function") {
                    options.onFocusChange(options.lastSel);
                }
            },
			layout = function (el) {
				var options = $(el).data('datepicker');
				if (!options.flat) {
				    //var cal = $('#' + options.id);
			        //if (!options.extraHeight) {
			        //    var divs = $(el).find('div');
			        //    options.extraHeight = divs.get(0).offsetHeight;
			        //    options.extraWidth = divs.get(0).offsetWidth;
			        //    //options.extraHeight = divs.get(0).offsetHeight + divs.get(1).offsetHeight;
			        //    //options.extraWidth = divs.get(2).offsetWidth + divs.get(3).offsetWidth;
			        //}
			        //var tbl = cal.find('div.datepickerContainer:first').get(0);
			        //var width = tbl.offsetWidth;
			        //var height = tbl.offsetHeight;
			        //cal.css({
			        //    width: width + options.extraWidth + 'px',
			        //    height: height + options.extraHeight + 'px'
			        //}).find('div.datepickerContainer').css({
			        //    width: width + 'px',
			        //    height: height + 'px'
			        //});
			    }
			},
			click = function (ev) {
			    
			    if ($(ev.target).is('span:not(.datepicker-link)')) {
					ev.target = ev.target.parentNode;
				}
				var el = $(ev.target);
			    var isChangeTriggered = true;
			    if (el.is('span.datepicker-link')) {
			        //ev.target.blur();
					if (el.hasClass('datepickerDisabled')) {
						return false;
					}
					var options = $(this).data('datepicker');
					var parentEl = el.parent();
					var tblEl = parentEl.parent().parent().parent();
				    var tblIndex = $('table', this).index(tblEl.get(0)); //- 1;
					var tmp = new Date(options.current);
					var changed = false;
					var fillIt = false;
					if (parentEl.is('th')) {
						if (parentEl.hasClass('datepickerWeek') && options.mode == 'range' && !parentEl.next().hasClass('datepickerDisabled')) {
							var val = parseInt(parentEl.next().text(), 10);
							if (options.calendars > 1) tmp.addMonths(tblIndex - options.currentCal);

							if (parentEl.next().hasClass('datepickerNotInMonth')) {
								tmp.addMonths(val > 15 ? -1 : 1);
							}
							tmp.setDate(val);
							options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
							tmp.setHours(23,59,59,0);
							tmp.addDays(6);
							options.date[1] = tmp.valueOf();
							fillIt = true;
							changed = true;
							options.lastSel = false;
						} else if (parentEl.hasClass('datepickerMonth')) {
						    if ($(options.el).is(".only-dates-view")) return false;
						    if (options.calendars > 1) tmp.addMonths(tblIndex - options.currentCal);
						    options.current = tmp;
						    fillIt = true;
							switch (tblEl.get(0).className) {
							    case 'datepickerViewDays':
									tblEl.get(0).className = 'datepickerViewMonths';
									//el.find('span').text(tmp.getFullYear());
									$('table', this).not(tblEl).addClass("hidden");
							        tblEl.parent().addClass("datepicker-wide");
									break;
							    case 'datepickerViewMonths':
									tblEl.get(0).className = 'datepickerViewYears';
							        el.find('span').text((tmp.getFullYear() - 6) + ' - ' + (tmp.getFullYear() + 5)).addClass("datepickerDisabled");

									$('table', this).not(tblEl).addClass("hidden");
									tblEl.parent().addClass("datepicker-wide");
									break;
							    case 'datepickerViewYears':
							        return false;
									//tblEl.get(0).className = 'datepickerViewDays';
									//el.find('span').text(formatDate(tmp, 'B, Y'));
									break;
						    }


						} else if (parentEl.parent().parent().is('thead')) {
							switch (tblEl.get(0).className) {
								case 'datepickerViewDays':
									options.current.addMonths(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
							    case 'datepickerViewMonths':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
									break;
								case 'datepickerViewYears':
									options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -12 : 12);
									break;
							}
							fillIt = true;
						}
					} else if (parentEl.is('td') && !parentEl.hasClass('datepickerDisabled')) {
					    tblEl.find("thead .datepickerDisabled").removeClass("datepickerDisabled");
					    if (tblEl.parent().is(".datepicker-wide")) {
					        tblEl.parent().removeClass("datepicker-wide");
					        $('table.hidden', this).removeClass("hidden");
					    }

						switch (tblEl.get(0).className) {
						    case 'datepickerViewMonths':
								options.current.setMonth(tblEl.find('tbody.datepickerMonths td').index(parentEl));
								options.current.setFullYear(parseInt(tblEl.find('thead th.datepickerMonth span').text(), 10));
								if (options.calendars > 1) options.current.addMonths(options.currentCal - tblIndex);
								tblEl.get(0).className = 'datepickerViewDays';
								break;
						    case 'datepickerViewYears':
								options.current.setFullYear(parseInt(el.text(), 10));
								tblEl.get(0).className = 'datepickerViewMonths';

								$('table', this).not(tblEl).addClass("hidden");
								tblEl.parent().addClass("datepicker-wide");
								break;
						    default:
						        isChangeTriggered = false;
								var val = parseInt(el.text(), 10);
								if (options.calendars > 1) tmp.addMonths(tblIndex - options.currentCal);
								if (parentEl.hasClass('datepickerNotInMonth')) {
									tmp.addMonths(val > 15 ? -1 : 1);
								}
								tmp.setDate(val);
								switch (options.mode) {
									case 'multiple':
										val = (tmp.setHours(0,0,0,0)).valueOf();
										if ($.inArray(val, options.date) > -1) {
											$.each(options.date, function(nr, dat){
												if (dat == val) {
													options.date.splice(nr,1);
													return false;
												}
											});
										} else {
											options.date.push(val);
										}
										break;
									case 'range':
										if (!options.lastSel) {
											options.date[0] = (tmp.setHours(0,0,0,0)).valueOf();
										}
										val = (tmp.setHours(23,59,59,0)).valueOf();
										if (val < options.date[0]) {
											options.date[1] = options.date[0] + 86399000;
											options.date[0] = val - 86399000;
										} else {
											options.date[1] = val;
										}
									    changeLastSel(this, !options.lastSel);
									    //options.lastSel = !options.lastSel;
										break;
								    default:
								        options.date = tmp.valueOf();
										break;
								}
								changed = true;
								break;
						}
						fillIt = true;
					}
					if (fillIt) {
						fill(this);
					}
					if (changed) {
					    options.onChange.apply(this, prepareDate(options));
					}
				}
				return false;
			},
			prepareDate = function (options) {
				var tmp;
				if (options.mode == 'single') {
					tmp = new Date(options.date);
					return [formatDate(tmp, options.format), tmp, options.el];
				} else {
					tmp = [[],[], options.el];
					$.each(options.date, function(nr, val){
						var date = new Date(val);
						tmp[0].push(formatDate(date, options.format));
						tmp[1].push(date);
					});
					return tmp;
				}
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			show = function (ev, needUpdate) {
			    var cal = $('#' + $(this).data('datepickerId'));
			    if (!cal.is(':visible') || needUpdate === true) {
				    
					var calEl = cal.get(0);
					fill(calEl);
					var options = cal.data('datepicker');
					options.onBeforeShow.apply(this, [cal.get(0)]);
					var pos = $(this).offset();
					var viewPort = getViewport();
					var top = pos.top;
				    
					var left = pos.left;
					//var oldDisplay = $.curCSS(calEl, 'display');
					cal.css({
						visibility: 'hidden',
						display: 'block'
					});
					layout(calEl);
					switch (options.position){
						case 'top':
							top -= calEl.offsetHeight;
							break;
						case 'left':
							left -= calEl.offsetWidth;
							break;
						case 'right':
							left += this.offsetWidth;
							break;
					    case 'bottom':
						    top += this.offsetHeight;
						    left -= this.offsetWidth +5; 
						    break;
					    case 'bottomleft':
					        top += this.offsetHeight;
					        //left -= this.offsetWidth +5; 
					        break;
					    case 'bottomright':
					        top += this.offsetHeight;
					        left += this.offsetWidth - cal.outerWidth();
					        //left -= this.offsetWidth +5; 
					        break;
					}
					//if (top + calEl.offsetHeight > viewPort.t + viewPort.h) {
					//	top = pos.top  - calEl.offsetHeight;
					//}
					//if (top < viewPort.t) {
					//	top = pos.top + this.offsetHeight + calEl.offsetHeight;
					//}
					//if (left + calEl.offsetWidth > viewPort.l + viewPort.w) {
					//	left = pos.left - calEl.offsetWidth;
					//}
					//if (left < viewPort.l) {
					//	left = pos.left + this.offsetWidth
					//}

					cal.css({
						visibility: 'visible',
						display: 'block',
						top: top + 'px',
						left: left + 'px'
					});
					if (options.onShow.apply(this, [cal.get(0)]) != false) {
						cal.show();
					}
					$(document).bind('mousedown', {cal: cal, trigger: this}, hide);
				}
				return false;
			},
			hide = function (ev) {
				if (ev.target != ev.data.trigger && !isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('datepicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			}
		return {
			init: function(options){
				options = $.extend({}, defaults, options||{});
				extendDate(options.locale);
				options.calendars = Math.max(1, parseInt(options.calendars, 10) || 1);
			    options.currentCal = Math.floor(options.calendars / 2) - 1;
				options.mode = /single|multiple|range/.test(options.mode) ? options.mode : 'single';
				return this.each(function(){
					if (!$(this).data('datepicker')) {
						options.el = this;
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode != 'single') {
							if (options.date.constructor != Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (!options.current) {
							options.current = new Date();
						} else {
							options.current = parseDate(options.current, options.format);
						} 
						options.current.setDate(1);
						options.current.setHours(0,0,0,0);
						var id = 'datepicker_' + parseInt(Math.random() * 1000), cnt;
						options.id = id;
						$(this).data('datepickerId', options.id);
						var cal = $(tpl.wrapper).attr('id', id).bind('click', click).data('datepicker', options);
						if (options.className) {
							cal.addClass(options.className);
						}
						var html = '';
						for (var i = 0; i < options.calendars; i++) {
							cnt = options.starts;
							//if (i > 0) {
							//	html += tpl.space;
							//}
							html += tmpl(tpl.head.join(''), {
									week: options.locale.weekMin,
									prev: options.prev,
									next: options.next,
									day1: options.locale.daysMin[(cnt++)%7],
									day2: options.locale.daysMin[(cnt++)%7],
									day3: options.locale.daysMin[(cnt++)%7],
									day4: options.locale.daysMin[(cnt++)%7],
									day5: options.locale.daysMin[(cnt++)%7],
									day6: options.locale.daysMin[(cnt++)%7],
									day7: options.locale.daysMin[(cnt++)%7]
								});
						}
						cal.find('.datepickerContainer:first').prepend(html).find('table').addClass(views[options.view]);
						fill(cal.get(0));
						if (options.flat) {
						    if (options.position && options.position instanceof jQuery) {
						        //cal.appendTo(options.position).show().css('position', 'relative');
						        cal.appendTo(options.position).show().css({
						            'display': 'block',
						            'position': 'relative'
						        });
						    } else {
						        //cal.appendTo(this).show().css('position', 'relative');
						        cal.appendTo(this).css({
                                    'display' : 'block',
						            'position': 'relative'
						        });
						    }
						    layout(cal.get(0));
						} else {
						    cal.appendTo(document.body);
						    $(this).bind(options.eventName, show);

						    $(window).resize(function () {				        
						        if (cal.is(":visible")) {
						            show.apply(options.el,[{},true]);
						        }
						    });
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('datepickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
				    if ($(this).data('datepickerId')) {
						$('#' + $(this).data('datepickerId')).hide();
					}
				});
			},
			setDate: function(date, shiftTo){
			    return this.each(function () {
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						options.date = date;
					    if (!options.date) return;
						if (options.date.constructor == String) {
							options.date = parseDate(options.date, options.format);
							options.date.setHours(0,0,0,0);
						}
						if (options.mode != 'single') {
							if (options.date.constructor != Array) {
								options.date = [options.date.valueOf()];
								if (options.mode == 'range') {
									options.date.push(((new Date(options.date[0])).setHours(23,59,59,0)).valueOf());
								}
							} else {
								for (var i = 0; i < options.date.length; i++) {
									options.date[i] = (parseDate(options.date[i], options.format).setHours(0,0,0,0)).valueOf();
								}
								if (options.mode == 'range') {
									options.date[1] = ((new Date(options.date[1])).setHours(23,59,59,0)).valueOf();
								}
							}
						} else {
							options.date = options.date.valueOf();
						}
						if (shiftTo) {
						    options.current = new Date(options.mode != 'single' ? options.date[0] : options.date);
						}
						fill(cal.get(0));
					}
				});
			},
			getDate: function(formated) {
				if (this.size() > 0) {
					return prepareDate($('#' + $(this).data('datepickerId')).data('datepicker'))[formated ? 0 : 1];
				}
			},
			setMinDate: function (date) {
			    var that = this;
			    return this.each(function () {
			        if ($(this).data('datepickerId') && !!date) {

			            date.setHours(0,0,0,0);
			            var cal = $('#' + $(this).data('datepickerId'));
			            var options = cal.data('datepicker');
			            options.minDate = new Date(date.getTime());
			            if (options.current < options.minDate) options.current = new Date(options.minDate.getTime());
			            if (options.date < options.minDate) that.DatePickerSetDate(options.minDate).val(formatDate(options.minDate, options.format));
			            fill(cal.get(0));
			        }
			    });
			},
			clear: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.mode != 'single') {
							options.date = [];
							fill(cal.get(0));
						}
					}
				});
			},
			refresh: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						fill(cal.get(0));
					}
				});
			},
			fixLayout: function(){
				return this.each(function(){
					if ($(this).data('datepickerId')) {
						var cal = $('#' + $(this).data('datepickerId'));
						var options = cal.data('datepicker');
						if (options.flat) {
							layout(cal.get(0));
						}
					}
				});
			},
		    changeMode: function(newMode) {
		        return this.each( function () {
		            if ($(this).data('datepickerId')) {
		                var cal = $('#' + $(this).data('datepickerId'));
		                var options = cal.data('datepicker');
		                options.mode = newMode;
		            }
		        });
		    },
            destroy: function() {
                if ($(this).data('datepickerId')) {
                    var cal = $('#' + $(this).data('datepickerId'));
                    cal.remove();
                }
            },
            setclickeditem: function (lastSel) {
		        var that = this;
		        return this.each(function () {
		            if ($(this).data('datepickerId')) {
		                var cal = $('#' + $(this).data('datepickerId'));
		                
		                changeLastSel(cal.get(0), lastSel);
		                fill(cal.get(0));
		            }
		        });
            }
		};
	}();
	$.fn.extend({
		DatePicker: DatePicker.init,
		DatePickerHide: DatePicker.hidePicker,
		DatePickerShow: DatePicker.showPicker,
		DatePickerSetDate: DatePicker.setDate,
		DatePickerGetDate: DatePicker.getDate,
		DatePickerSetMinDate: DatePicker.setMinDate,
		DatePickerSetMaxDate: DatePicker.setMaxDate,
		DatePickerClear: DatePicker.clear,
		DatePickerRefresh: DatePicker.refresh,
		DatePickerLayout: DatePicker.fixLayout,
		DatePickerChangeMode: DatePicker.changeMode,
		DatePickerDestroy: DatePicker.destroy,
		DatePickerSetClickedItem: DatePicker.setclickeditem
	});
})(jQuery);

(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
