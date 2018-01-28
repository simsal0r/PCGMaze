#install.packages('plyr')
library(plyr)
library(ggplot2)

#####################################################################################################################
# Load Data and transform it
rm(list = ls())
pre.survey = read.csv("Survey.csv", dec = ",")
pre.survey$Zeitstempel = NULL
pre.survey$Kommentar.und.VerbesserungsvorschlÃ.ge = NULL

survey = data.frame(gender = pre.survey$Geschlecht, 
                    age = pre.survey$Alter,
                    GamingHours = pre.survey$Wieviele.Stunden.haben.Sie.am.Tag.zu.Ihrer.HÃ.chstzeit.Videospiele.gespielt.,
                    PcHours = pre.survey$Wieviele.Stunden.verbringen.Sie.am.Tag.insgesamt.am.Computer.,
                    HorDif1 = pre.survey$Schwierigkeitsgrad,
                    HorCompleted1 = pre.survey$Level.erfolgreich.bestanden.,
                    HorDif2 = pre.survey$Schwierigkeitsgrad.1,
                    HorCompleted2 = pre.survey$Level.erfolgreich.bestanden..1,
                    HorDif3 = pre.survey$Schwierigkeitsgrad.2,
                    HorCompleted3 = pre.survey$Level.erfolgreich.bestanden..2,
                    HorDif4 = pre.survey$Schwierigkeitsgrad.3,
                    HorCompleted4 = pre.survey$Level.erfolgreich.bestanden..3,
                    HorDif5 = pre.survey$Schwierigkeitsgrad.4,
                    HorCompleted5 = pre.survey$Level.erfolgreich.bestanden..4,
                    HapDif1 = pre.survey$Schwierigkeitsgrad.5,
                    HapCompleted1 = pre.survey$Level.erfolgreich.bestanden..5,
                    HapDif2 = pre.survey$Schwierigkeitsgrad.6,
                    HapCompleted2 = pre.survey$Level.erfolgreich.bestanden..6,
                    HapDif3 = pre.survey$Schwierigkeitsgrad.7,
                    HapCompleted3 = pre.survey$Level.erfolgreich.bestanden..7,
                    HapDif4 = pre.survey$Schwierigkeitsgrad.8,
                    HapCompleted4 = pre.survey$Level.erfolgreich.bestanden..8,
                    HapDif5 = pre.survey$Schwierigkeitsgrad.9,
                    HapCompleted5 = pre.survey$Level.erfolgreich.bestanden..9,
                    PrefSetting = pre.survey$Welches.AtmosphÃ.re.hat.Ihnen.mehr.Spass.gemacht.)

rm(pre.survey)

survey$PcHours = as.numeric(sub(",", ".", gsub(" Minuten", "", survey$PcHours), fixed = T))
survey$gender = revalue(survey$gender, c("MÃ¤nnlich"="male", "Weiblich"="female"))
survey$HorCompleted1 = revalue(survey$HorCompleted1, c("Ja"="yes", "Nein"="no"))
survey$HorCompleted2 = revalue(survey$HorCompleted2, c("Ja"="yes", "Nein"="no"))
survey$HorCompleted3 = revalue(survey$HorCompleted3, c("Ja"="yes", "Nein"="no"))
survey$HorCompleted4 = revalue(survey$HorCompleted4, c("Ja"="yes", "Nein"="no"))
survey$HorCompleted5 = revalue(survey$HorCompleted5, c("Ja"="yes", "Nein"="no"))
survey$HapCompleted1 = revalue(survey$HapCompleted1, c("Ja"="yes", "Nein"="no"))
survey$HapCompleted2 = revalue(survey$HapCompleted2, c("Ja"="yes", "Nein"="no"))
survey$HapCompleted3 = revalue(survey$HapCompleted3, c("Ja"="yes", "Nein"="no"))
survey$HapCompleted4 = revalue(survey$HapCompleted4, c("Ja"="yes", "Nein"="no"))
survey$HapCompleted5 = revalue(survey$HapCompleted5, c("Ja"="yes", "Nein"="no"))
survey$PrefSetting = revalue(survey$PrefSetting, c("Happy AtmosphÃ¤re"="happy", "Horror AtmosphÃ¤re"="horror"))

# str(survey)
# summary(survey)

#####################################################################################################################

#GGally::ggpairs(survey)

# boxplot(survey)
# 
# cm = colMeans(survey[,c(2,3,4,5,7,9,11,13,15,17,19,21,23)])
# S = cov(survey[,c(2,3,4,5,7,9,11,13,15,17,19,21,23)])
# d = apply(survey[,c(2,3,4,5,7,9,11,13,15,17,19,21,23)], 1, function(x) {
#   t(x - cm) %*% solve(S) %*% (x-cm)
# })
# 
# qc = qchisq((seq_len(nrow(survey)) - 1/2) / nrow(survey), df = 12)
# sort.d = sort(d)
# plot(qc, sort.d, las = 1, pch = 19, xlab = expression(paste(chi[12]^ 2,"-Quantile")), ylab = "Ordered Distances", xlim = range(qc) * c(0, 1.1), ylim = range(sort.d) * c(0, 1.1))
# q995 = qchisq(0.995, df = 14)
# abline(h = q995, col = "red", lty = 2)




# stan.survey = apply(survey[,c(2,3,4,5,7,9,11,13,15,17,19,21,23)], 2, function(x) (x - mean(x)) / sd(x))
# # Get values which are equal and higher than 3.5
# outlier = apply(stan.survey, 2, function(x) {
#   which(x >= 3.5)
# })

# stanOutl = c(outlier$age, outlier$PcHours)
# survey$col = c(rep("grey", times = 39))
# survey[stanOutl, "col"] = "red"
# # pairs(data4[,c(1:4)], pch = 19, col= data4$col)
# # pairs(data4[,c(5:8)], pch = 19, col= data4$col)
# # pairs(data4[,c(9:12)], pch = 19, col= data4$col)
# # pairs(data4[,c(13:16)], pch = 19, col= data4$col)
# pairs(survey[,c(2,3,4,5,7,9,11,13,15,17,19,21,23)], pch = 19, col = survey$col)
# survey$col = NULL

survey = survey[which(survey$age < 50),]
# par(mfrow = c(5, 2))
# g = ggplot(survey, aes())
# g + geom_histogram(aes(x = HorDif1), alpha = 0.2, fill = "red", position ="identity")
# g + geom_histogram(alpha = 0.2, aes(x = HapDif1), fill = "blue", poisition = "dodge")


library(reshape2)

#################################################
# hist of difficulties
length(which(survey$HapDif1 == 2))
Dif1 = data.frame(Frequency = c(survey$HorDif1, survey$HapDif1), Setting =c(rep("horror",42), rep("happy",42)))
ggplot(Dif1, aes(Dif1$Frequency, ..count..)) + geom_bar(aes(fill = Setting), position = "dodge")+
  labs(x="Perceived Difficulty Level 1", y="Frequency") + ggtitle(paste(paste("Mean of Horror:", round(mean(survey$HorDif1), digits = 2)), paste("Mean of Happy:", round(mean(survey$HapDif1), digits = 1)), sep = "    "))

Dif2 = data.frame(Frequency = c(survey$HorDif2, survey$HapDif2), Setting =c(rep("horror",42), rep("happy",42)))
ggplot(Dif2, aes(Dif2$Frequency, ..count..)) + geom_bar(aes(fill = Setting), position = "dodge")+
  labs(x="Difficulty", y="Frequency")

Dif3 = data.frame(Frequency = c(survey$HorDif3, survey$HapDif3), Setting =c(rep("horror",42), rep("happy",42)))
ggplot(Dif3, aes(Dif3$Frequency, ..count..)) + geom_bar(aes(fill = Setting), position = "dodge")+
  labs(x="Difficulty", y="Frequency")

Dif4 = data.frame(Frequency = c(survey$HorDif4, survey$HapDif4), Setting =c(rep("horror",42), rep("happy",42)))
ggplot(Dif4, aes(Dif4$Frequency, ..count..)) + geom_bar(aes(fill = Setting), position = "dodge")+
  labs(x="Difficulty", y="Frequency")

Dif5 = data.frame(Frequency = c(survey$HorDif5, survey$HapDif5), Setting =c(rep("horror",42), rep("happy",42)))
ggplot(Dif5, aes(Dif5$Frequency, ..count..)) + geom_bar(aes(fill = Setting), position = "dodge")+
  labs(x="Difficulty", y="Frequency")

Cum1 = data.frame(Frequency = (c(survey$HorDif1, survey$HorDif2, survey$HorDif3, survey$HorDif4, survey$HorDif5)))
ggplot(Cum1, aes(Cum1$Frequency, ..count..)) + geom_bar() + labs(x = "Perceived Difficulty for all Horror Levels", y = "Frequency") + ggtitle(paste("Mean of perceived Horror difficulty:", round(mean(Cum1$Frequency), digits = 2)))


Cum2 = data.frame(Frequency = (c(survey$HapDif1, survey$HapDif2, survey$HapDif3, survey$HapDif4, survey$HapDif5,survey$HorDif1, survey$HorDif2, survey$HorDif3, survey$HorDif4, survey$HorDif5)))
ggplot(Cum2, aes(Cum2$Frequency, ..count..)) + geom_bar(aes(fill = "red")) + labs(x = "Perceived difficulty for all levels", y = "Frequency") + ggtitle(paste("Mean of perceived difficulty:", round(mean(Cum2$Frequency), digits = 2)))


##### SPLIT INTO GENDERS
survey.fem = survey[which(survey$gender == "female"),]                                                                                                                                             
Cum2.fem = data.frame(Frequency = (c(survey.fem$HapDif1, survey.fem$HapDif2, survey.fem$HapDif3, survey.fem$HapDif4, survey.fem$HapDif5)))
ggplot(Cum2.fem, aes(Cum2.fem$Frequency, ..count..)) + geom_bar() + labs(x = "Perceived Difficulty for all Happy Levels", y = "Frequency") + ggtitle(paste("Mean of perceived Happy difficulty:", round(mean(Cum2$Frequency), digits = 2)))

mean(survey[which(survey$gender == "female"), "PcHours"])

survey.mal = survey[which(survey$gender == "male"),]                                                                                                                                             
Cum2.fem = data.frame(Frequency = (c(survey.fem$HapDif1, survey.fem$HapDif2, survey.fem$HapDif3, survey.fem$HapDif4, survey.fem$HapDif5)))
ggplot(Cum2.fem, aes(Cum2.fem$Frequency, ..count..)) + geom_bar() + labs(x = "Perceived Difficulty for all Happy Levels", y = "Frequency") + ggtitle(paste("Mean of perceived Happy difficulty:", round(mean(Cum2$Frequency), digits = 2)))


ggplot(survey, aes(survey$PrefSetting, ..count..)) + geom_bar(aes(fill = gender), position = "dodge") + labs(x = "Preffered Setting", y = "Frequency")

ggplot(survey, aes(survey))

GGally::ggpairs(survey[, c("gender", "age", "PrefSetting", "GamingHours", "PcHours")])
